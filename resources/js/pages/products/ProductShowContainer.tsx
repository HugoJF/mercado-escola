import React, {useEffect, useState} from 'react';
import {useParams}                  from "react-router";
import {useDispatch}          from "react-redux";
import {Dispatch}             from "../../store";
import {ProductShow}          from "./ProductShow";
import {useProduct}           from "../../queries/useProduct";
import {useCartRemoveProduct} from "../../mutations/useCartRemoveProduct";
import {useCartProduct}       from "../../queries/useCartProduct";
import {useCartAddProduct}    from "../../mutations/useCartAddProduct";
import {Loading}              from "../../components/ui/Loading";
import {isEmpty}              from "../../helpers/Functions";

type Params = {
    productId: string;
}

export const ProductShowContainer: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const params = useParams<Params>();
    const productId = parseInt(params.productId);

    const [quantity, setQuantity] = useState(0);
    const product = useProduct(productId);
    const cartProduct = useCartProduct(productId);
    const cartAddProduct = useCartAddProduct();
    const cartRemoveProduct = useCartRemoveProduct();

    useEffect(() => {
        if (cartProduct?.data?.data?.data?.pivot) {
            setQuantity(cartProduct.data.data.data.pivot.quantity);
        }
    }, [cartProduct.data]);

    function handleAdd() {
        if (!product.data || !cartProduct.data) {
            return;
        }

        if (cartProduct.data.data.data && !isEmpty(cartProduct.data.data.data)) {
            cartAddProduct.mutate({
                quantity: quantity + 1,
                product_id: productId,
            });
            setQuantity(quantity + 1);
        } else {
            cartAddProduct.mutate({
                quantity: 1,
                product_id: productId,
            });
            setQuantity(1);
            dispatch.toasts.add({
                title: 'Produto adicionado!',
                description: `${product.data.data.data.name} foi adicionado ao carrinho`
            });
        }
    }

    function handleSubtract() {
        if (!product.data || !cartProduct.data || !cartProduct.data.data.data) {
            return;
        }

        if (quantity === 1) {
            cartRemoveProduct.mutate(productId);
            dispatch.toasts.add({
                title: 'Produto removido!',
                description: `${product.data.data.data.name} foi removido do carrinho`
            });
            setQuantity(0);
        } else {
            cartAddProduct.mutate({
                quantity: quantity - 1,
                product_id: productId,
            });
            setQuantity(quantity - 1);
        }
    }

    if (!product.data || !cartProduct.data) {
        return <Loading/>;
    }

    return <ProductShow
        product={product.data.data.data}
        quantity={quantity}
        handleAdd={handleAdd}
        handleSubtract={handleSubtract}
    />
};
