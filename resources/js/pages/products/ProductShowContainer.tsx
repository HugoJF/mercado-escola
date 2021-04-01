import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {useDispatch} from "react-redux";
import {Dispatch} from "../../store";
import {ProductShow} from "./ProductShow";
import {useProduct} from "../../queries/useProduct";
import {useCartRemoveProduct} from "../../mutations/useCartRemoveProduct";
import {useCartProduct} from "../../queries/useCartProduct";
import {useCartAddProduct} from "../../mutations/useCartAddProduct";
import {Loading} from "../../components/ui/Loading";
import {isEmpty} from "../../helpers/Functions";

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

    const onCart = !isEmpty(cartProduct?.data?.data?.data);

    useEffect(() => {
        if (cartProduct?.data?.data?.data?.pivot) {
            setQuantity(cartProduct.data.data.data.pivot.quantity);
        }
    }, [cartProduct.data]);

    function handleOnRemove() {
        cartRemoveProduct.mutate(productId);
        setQuantity(0);
    }

    function handleOnQuantityChange(newQuantity: number) {
        if (!product.data || !cartProduct.data) {
            return;
        }

        // TODO: handle mutation fail (reset to previous quantity)
        if (onCart) {
            if (newQuantity === 0) {
                dispatch.toasts.add({
                    title: 'Produto removido!',
                    description: `${product.data.data.data.name} foi removido do carrinho`
                });
                cartRemoveProduct.mutate(productId);
            } else if (newQuantity !== quantity) {
                cartAddProduct.mutate({
                    quantity: newQuantity,
                    product_id: productId,
                });
            }
        } else {
            if (newQuantity > 0) {
                dispatch.toasts.add({
                    title: 'Produto adicionado!',
                    description: `${product.data.data.data.name} foi adicionado ao carrinho`
                });
                cartAddProduct.mutate({
                    quantity: newQuantity,
                    product_id: productId,
                });
            }
        }
        setQuantity(newQuantity);
    }

    if (!product.data || !cartProduct.data) {
        return <Loading/>;
    }

    return <ProductShow
        product={product.data.data.data}
        quantity={quantity}
        onQuantityChange={handleOnQuantityChange}
        onRemove={handleOnRemove}
    />
};
