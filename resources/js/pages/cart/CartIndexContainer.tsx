import React, {useEffect, useState} from "react";
import useNavigation                from "../../hooks/useNavigation";
import {useCart}         from "../../queries/useCart";
import {Loading}         from "../../components/ui/Loading";
import {CartIndex}       from "./CartIndex";
import {useMutation}     from "react-query";
import {api}             from "../../api";
import {useCartAddress}  from "../../mutations/useCartAddress";

export const CartIndexContainer: React.FC = () => {
    const {go} = useNavigation();
    const [delivery, setDelivery] = useState(false);
    const [deliveryOptions, setDeliveryOptions] = useState(false);

    const cart = useCart();
    const create = useMutation(() => api.favorites.index()); // FIXME
    const updateCartAddress = useCartAddress();

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

    return cart.data
        ?
        <CartIndex
            address={cart.data.data.address}
            products={cart.data.data.products}
            opening={cart.data.data.opening}
            pending={create.isLoading}
            onDeliverySelected={handleOnDeliverySelected}
            onOrderStore={() => {}}
            onRemove={() => {}}
            onShippingChanged={handleOnShoppingChanged}
            setShippingOptionsOpen={handleSetShippingOptionsOpen}
            delivery={delivery}
            shippingOptionsOpen={deliveryOptions}
        />
        :
        <Loading/>

};
