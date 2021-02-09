import React                                               from "react";
import {useParams}                                         from "react-router";
import {useDispatch}                                       from "react-redux";
import {Dispatch}                                          from "../../store";
import {useAddresses, useOpenings, useOrders, useProducts} from "../../selectors";
import {OrdersShow}                                        from "./OrdersShow";
import {OrderType}                                         from "../../models/orders";
import useLoadEffect                                       from "../../hooks/useLoadEffect";
import {Loading}                                           from "../../components/ui/Loading";
import useNavigation                                       from "../../hooks/useNavigation";

const status = [{
    title: 'Pedido foi aceito',
    done: true,
    date: '14h24 - 10/09/2020'
}, {
    title: 'Pedido está pronto',
    done: true,
    date: '11h01 - 11/09/2020'
}, {
    title: 'Pedido sendo entregue',
    done: false,
    date: '15h15 - 14/09/2020'
}];

export const OrdersShowContainer: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const {go} = useNavigation();
    const params = useParams<{ orderId: string }>();
    const orders = useOrders();
    const addresses = useAddresses();
    const openings = useOpenings();
    const products = useProducts();

    const loading = useLoadEffect(async () => {
        await Promise.all([
            dispatch.orders.index(),
            dispatch.addresses.index(),
            dispatch.openings.index(),
            dispatch.products.index(),
        ]);
    }, []);

    function handleOrderCancelled(order: OrderType) {
        dispatch.orders.cancel(order);
        go('/pedidos');
    }

    const order = orders.orders[params.orderId];

    if (!order) {
        return null;
    }

    const opening = openings.openings[order.opening_id];

    if (!opening) {
        return null;
    }

    const address = addresses.addresses[order.address_id];

    const cartProducts = order.products.map(value => products.products[value]);
    const cartQuantities = order.quantities;
    const cartCosts = order.costs;

    return loading ? <Loading/> : <OrdersShow
        order={order}
        products={cartProducts}
        quantities={cartQuantities}
        costs={cartCosts}
        opening={opening}
        address={address}
        status={status}
        onCancel={handleOrderCancelled}
    />
};
