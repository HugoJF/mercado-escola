import React, {useEffect}                     from "react";
import {useHistory, useParams}                from "react-router";
import {useDispatch}                          from "react-redux";
import {Dispatch}                             from "../../store";
import {useAddresses, useOpenings, useOrders} from "../../selectors";
import {OrdersShow}                           from "./OrdersShow";
import {OrderType}                            from "../../models/orders";

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
    const history = useHistory();
    const params = useParams<{ orderId: string }>();
    const orders = useOrders();
    const addresses = useAddresses();
    const openings = useOpenings();

    useEffect(() => {
        dispatch.orders.index();
        dispatch.addresses.index();
        dispatch.openings.index();
    }, []);

    function handleOrderCancelled(order: OrderType) {
        dispatch.orders.cancel(order);
        history.push('/pedidos');
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

    return <OrdersShow
        order={order}
        opening={opening}
        address={address}
        status={status}
        onCancel={handleOrderCancelled}
    />
};
