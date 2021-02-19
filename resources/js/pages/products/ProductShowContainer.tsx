import React           from 'react';
import {useParams}     from "react-router";
import useCartQuantity from "../../hooks/useCartQuantity";
import {useDispatch}   from "react-redux";
import {Dispatch}      from "../../store";
import {Loading}       from "../../components/ui/Loading";
import {ProductShow}   from "./ProductShow";
import {useProduct}    from "../../queries/useProduct";

type Params = {
    productId: string;
}

export const ProductShowContainer: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const params = useParams<Params>();
    const productId = parseInt(params.productId);

    const {status, data, error, isFetching} = useProduct(productId);
    const [text, quantity, total, add, subtract] = useCartQuantity(data?.data.data);

    if (!data) {
        return <Loading/>;
    }

    function handleAdd() {
        if (data && add()) {
            dispatch.toasts.add({
                title: 'Produto adicionado!',
                description: `${data.data.data.name} foi adicionado ao carrinho`
            });
        }
    }

    function handleSubtract() {
        if (data && subtract()) {
            dispatch.toasts.add({
                title: 'Produto removido!',
                description: `${data.data.data.name} foi removido do carrinho`
            });
        }
    }

    return <ProductShow
        product={data.data.data}
        quantity={quantity}
        total={total}
        text={text}
        handleAdd={handleAdd}
        handleSubtract={handleSubtract}
    />
};
