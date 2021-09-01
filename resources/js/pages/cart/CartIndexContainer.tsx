import React, {useEffect, useState} from "react";
import useNavigation from "@hooks/useNavigation";
import {useCart} from "@queries/useCart";
import {Loading} from "@components/ui/Loading";
import {CartIndex} from "./CartIndex";
import {useCartAddress} from "@mutations/useCartAddress";
import {useOrderStore} from "@mutations/useOrderStore";

export const CartIndexContainer: React.FC = () => {
    const {go} = useNavigation();
    const [delivery, setDelivery] = useState(false);
    const [deliveryOptions, setDeliveryOptions] = useState(false);

    const cart = useCart();
    const updateCartAddress = useCartAddress();
    const orderStore = useOrderStore();

    useEffect(() => {
        if (!cart.data) {
            return;
        }
        setDelivery(!!cart.data.data.address)
    }, [cart.data]);

    function handleOnShoppingChanged(isDelivery: boolean) {
        setDelivery(isDelivery);
    }

    function handleOnDeliverySelected() {
        setDeliveryOptions(false);
        if (delivery) {
            go('/carrinho/endereco')
        }
        if (!delivery) {
            updateCartAddress.mutate(null);
        }
    }

    function handleSetShippingOptionsOpen() {
        setDeliveryOptions(true);
    }

    async function handleOnOrderStore() {
        const response = await orderStore.mutateAsync();
        go(`/pedidos/${response.data.data.id}/finalizado`);
    }

    return cart.data
        ?
        <CartIndex
            cart={cart.data.data}
            pending={updateCartAddress.isLoading || orderStore.isLoading}
            onDeliverySelected={handleOnDeliverySelected}
            onOrderStore={handleOnOrderStore}
            onRemove={() => {
            }}
            onShippingChanged={handleOnShoppingChanged}
            setShippingOptionsOpen={handleSetShippingOptionsOpen}
            delivery={delivery}
            shippingOptionsOpen={deliveryOptions}
        />
        :
        <Loading/>

};
