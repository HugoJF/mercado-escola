import React            from "react";
import {useDispatch}    from "react-redux";
import {Dispatch}       from "../../../store";
import {UserType}       from "../../../types/auth";
import {Loading}        from "../../../components/ui/Loading";
import {AdminUserIndex} from "./AdminUserIndex";
import {useUsers}       from "../../../queries/useUsers";

export const AdminUserIndexContainer: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();

    const {status, data, error, isFetching} = useUsers();

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
