import React              from "react";
import {useDispatch}      from "react-redux";
import {Dispatch}         from "../../../store";
import {useParams}        from "react-router-dom";
import useNavigation      from "../../../hooks/useNavigation";
import {AdminProductEdit} from "./AdminProductEdit";
import {Loading}          from "../../../components/ui/Loading";
import {useProduct}       from "../../../queries/useProduct";
import {useProductUpdate} from "../../../queries/mutations/useProductUpdate";

export const AdminProductEditContainer: React.FC = () => {
    const {go} = useNavigation();
    const params = useParams<{ productId: string }>();
    const productId = parseInt(params.productId);

    const {status, data, error, isFetching} = useProduct(productId);

    const mutation = useProductUpdate(productId);

    async function handleOnSubmit(data: FormData) {
        try {
            await mutation.mutateAsync(data);
            go('/admin/produtos');
        } catch (e) {
            throw {errors: e.response.data.errors};
        }
    }

    // @ts-ignore
    return data
        ?
        <AdminProductEdit
            product={data.data.data}
            onSubmit={handleOnSubmit}
        />
        :
        <Loading/>
};
