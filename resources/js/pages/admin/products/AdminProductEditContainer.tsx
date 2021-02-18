import React                   from "react";
import {useDispatch}           from "react-redux";
import {Dispatch}              from "../../../store";
import {useParams}             from "react-router-dom";
import useNavigation           from "../../../hooks/useNavigation";
import {useMutation, useQuery} from "react-query";
import {api}                   from "../../../api";
import {AdminProductEdit}      from "./AdminProductEdit";
import {Loading}               from "../../../components/ui/Loading";

export const AdminProductEditContainer: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const {go} = useNavigation();
    const params = useParams<{ productId: string }>();
    const productId = parseInt(params.productId);

    const {status, data, error, isFetching} = useQuery(
        ['product', params.productId],
        () => api.products.show(productId)
    );

    const mutation = useMutation((data: FormData) => dispatch.products.update({
        id: productId,
        data: data,
    }));

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
