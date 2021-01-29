import React, {useEffect, useMemo, useState}             from "react";
import {useHistory}                                      from "react-router-dom";
import {useAddresses, useCart, useOpenings, useProducts} from "../../selectors";
import {useDispatch}                                     from "react-redux";
import {Dispatch}                                        from "../../store";
import {ProductType}                                     from "../../models/products";
import {OrderProductsType}                               from "../../models/orders";
import {CartIndex}                                       from "./CartIndex";
import {Loading}                                         from "../../components/ui/Loading";

export const CartIndexContainer: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const history = useHistory();
    const addresses = useAddresses();
    const products = useProducts();
    const cart = useCart();
    const openings = useOpenings();
    const [loading, setLoading] = useState(false);
    const [shippingOptionOpen, setShippingOptionOpen] = useState(false);

    useEffect(() => {
        dispatch.products.index();
        dispatch.openings.current();
    }, []);

    const total = useMemo(() => {
        const {products, amounts} = cartInformation();

        return products.reduce((tot, product) => product.quantity_cost * amounts[product.id], 0);
    }, [products, cart]);

    function cartInformation() {
        const cartProducts = Object.values(products.products).filter(product => cart.items[product.id]);

        return {amounts: cart.items, products: cartProducts};
    }

    function remove(product: ProductType) {
        dispatch.cart.remove(product.id);
    }

    async function handleStoreOrder() {
        const products: OrderProductsType[] = [];
        setLoading(true);

        for (let [productId, quantity] of Object.entries(cart.items)) {
            products.push({
                product_id: parseInt(productId),
                quantity,
            })
        }

        let order = await dispatch.orders.store({
            address_id: cart.address_id as number,
            opening_id: openings.current as number,
            products,
        });
        dispatch.cart.reset();
        history.push(`/pedidos/${order.id}/finalizado`)
    }

    if (!openings.current) {
        return <Loading/>;
    }

    const address = cart.address_id ? addresses.addresses[cart.address_id] : null;
    const opening = openings.openings[openings.current];

    const {products: cartProducts, amounts: cartAmounts} = cartInformation();

    return <>
        <CartIndex
            address={address}
            opening={opening}
            products={cartProducts}
            quantities={cartAmounts}
            total={total}
            onRemove={remove}
            delivery={cart.delivery}
            setShippingOptionsOpen={setShippingOptionOpen}
            shippingOptionsOpen={shippingOptionOpen}
            handleShippingChanged={dispatch.cart.setDelivery}
            handleOrderStore={handleStoreOrder}
            loading={loading}
        />
    </>
};
