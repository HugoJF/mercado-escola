import React                from "react";
import {Title}              from "../../../components/ui/Title";
import {useDispatch}        from "react-redux";
import {Dispatch}           from "../../../store";
import {HeightTransitioner} from "../../../components/ui/HeightTransitioner";
import {Skeleton}           from "../../../components/ui/Skeleton";
import {PagePadding}        from "../../../containers/PagePadding";
import {Box}                from "../../../components/ui/Box";
import {Toggle}             from "../../../components/ui/Toggle";
import useLoadEffect        from "../../../hooks/useLoadEffect";
import {Badge}              from "../../../components/ui/Badge";
import {UserType}           from "../../../types/auth";
import {useQuery}           from "react-query";
import {api}                from "../../../api";
import {Loading}            from "../../../components/ui/Loading";
import {AdminUserIndex}     from "./AdminUserIndex";

export const AdminUserIndexContainer: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();

    const {status, data, error, isFetching} = useQuery(
        'users',
        api.users.index
    );

    async function handleOnAdminToggle(user: UserType) {
        await dispatch.users.update({
            id: user.id,
            data: {admin: !user.admin}
        });

        if (user.admin) {
            dispatch.toasts.add({
                title: 'Administrador removido!',
                description: `${user.name} deixou de ser administrador`
            });
        } else {
            dispatch.toasts.add({
                title: 'Novo administrador!',
                description: `${user.name} agora é um administrador`
            });
        }
    }

    return data
        ?
        <AdminUserIndex
            users={data.data.data}
            onAdminToggle={handleOnAdminToggle}
        />
    :
        <Loading/>
};
