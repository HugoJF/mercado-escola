import React from "react";
import {Title} from "@components/ui/Title";
import {HeightTransitioner} from "@components/ui/HeightTransitioner";
import {Skeleton} from "@components/ui/Skeleton";
import {PagePadding} from "@containers/PagePadding";
import {Box} from "@components/ui/Box";
import {Toggle} from "@components/ui/Toggle";
import {Badge} from "@components/ui/Badge";
import {UserType} from "@type/users";

export type AdminUserIndexProps = {
    users: UserType[];
    onAdminToggle: (user: UserType) => void;
}

export const AdminUserIndex: React.FC<AdminUserIndexProps> = ({users, onAdminToggle}) => {
    return <PagePadding>
        <div className="space-y-3">
            <Title>Usuários</Title>
            <Title sub>Usuários marcados possuem permissões de administradores.</Title>
        </div>

        <div className="divide-y divide-gray-200">
            {users.map(user => (
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
                                onToggle={() => onAdminToggle(user)}
                            />
                        </div>
                    </Box>
                </HeightTransitioner>
            ))}
        </div>
    </PagePadding>
};
