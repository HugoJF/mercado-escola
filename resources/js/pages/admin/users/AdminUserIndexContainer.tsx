import React from "react";
import {useDispatch} from "react-redux";
import {Dispatch} from "../../../store";
import {Loading} from "../../../components/ui/Loading";
import {AdminUserIndex} from "./AdminUserIndex";
import {useUsers} from "../../../queries/useUsers";
import {useUserUpdate} from "../../../mutations/useUserUpdate";
import {UserType} from "../../../types/users";

export const AdminUserIndexContainer: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();

    const {status, data, error, isFetching} = useUsers();
    const userUpdate = useUserUpdate();

    async function handleOnAdminToggle(user: UserType) {
        await userUpdate.mutateAsync({
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
