import React                   from "react";
import {useParams}             from "react-router";
import {OrdersShow}            from "./OrdersShow";
import {OrderType}             from "../../types/orders";
import {Loading}               from "../../components/ui/Loading";
import useNavigation           from "../../hooks/useNavigation";
import {useMutation, useQuery} from "react-query";
import {api}                   from "../../api";

export const OrdersShowContainer: React.FC = () => {
    const {go} = useNavigation();
    const params = useParams<{ orderId: string }>();

    const {status, data, error, isFetching} = useQuery(
        ['orders', params.orderId],
        () => api.orders.show(params.orderId)
    );

    const mutation = useMutation((order: OrderType) => api.orders.cancel(order));

    async function handleOrderCancelled(order: OrderType) {
        await mutation.mutateAsync(order);
        go('/pedidos');
    }

    return data
        ?
        <OrdersShow
            order={data.data.data}
            onCancel={handleOrderCancelled}
        />
        :
        <Loading/>;
};
