import React            from "react";
import {useParams}      from "react-router";
import {OrdersShow}     from "./OrdersShow";
import {OrderType}      from "../../types/orders";
import {Loading}        from "../../components/ui/Loading";
import useNavigation    from "../../hooks/useNavigation";
import {useOrder}       from "../../queries/useOrder";
import {useOrderCancel} from "../../mutations/useOrderCancel";

type Params = {
    orderId: string;
}

export const OrdersShowContainer: React.FC = () => {
    const {go} = useNavigation();
    const params = useParams<Params>();

    const {status, data, error, isFetching} = useOrder(params.orderId);

    const mutation = useOrderCancel();

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
