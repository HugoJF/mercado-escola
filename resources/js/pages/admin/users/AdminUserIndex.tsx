import React                from "react";
import {Title}              from "../../../components/ui/Title";
import {useDispatch}        from "react-redux";
import {Dispatch}           from "../../../store";
import {useUsers}           from "../../../selectors";
import {HeightTransitioner} from "../../../components/ui/HeightTransitioner";
import {Skeleton}           from "../../../components/ui/Skeleton";
import {PagePadding}        from "../../../containers/PagePadding";
import {Box}                from "../../../components/ui/Box";
import {Toggle}             from "../../../components/ui/Toggle";
import useLoadEffect        from "../../../hooks/useLoadEffect";
import {Badge}              from "../../../components/ui/Badge";

export const AdminUserIndex: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const users = useUsers();

    const loading = useLoadEffect(async () => {
        await dispatch.users.index();
    }, []);

    function getUsers(): any[] {
        if (loading) {
            return Array.from(Array(4).keys()).map(id => ({id}));
        } else {
            return Object.values(users.users);
        }
    }

    return <PagePadding>
        <div className="space-y-3">
            <Title>Usuários</Title>
            <Title sub>Usuários marcados possuem permissões de administradores.</Title>
        </div>

        <div className="divide-y divide-gray-200">
            {getUsers().map(user => (
                <HeightTransitioner key={user.id}>
                    <Box
                        key={user.id}
                    >
                        {/* Name */}
                        <div className="flex-grow space-y-1 mr-4">
                            <h2 className="text-sm">
                                {user.name || <Skeleton className="w-full"/>}
                            </h2>

                            {user.admin === undefined ? <Skeleton className="w-1/2"/>
                                :
                                (
                                    user.admin ?
                                        <Badge size="small" color="danger">Admin</Badge>
                                        :
                                        <Badge size="small" color="primary">Usuário</Badge>
                                )
                            }

                            <p className="text-xs">
                                {user.email || <Skeleton className="w-full"/>}
                            </p>
                        </div>

                        {/* Selected toggle */}
                        <div>
                            <Toggle
                                checked={user.admin}
                                onToggle={() => dispatch.users.update({id: user.id, data: {admin: !user.admin}})}
                            />
                        </div>
                    </Box>
                </HeightTransitioner>
            ))}
        </div>
    </PagePadding>
};
