import {HeightTransitioner} from "../../components/ui/HeightTransitioner";
import {OrderListItem} from "../../components/orders/OrderListItemProps";
import React from "react";
import {OrderType} from "../../types/orders";
import useNavigation from "../../hooks/useNavigation";

export type OrderListProps = {
    orders: OrderType[];
}

export const OrderList: React.FC<OrderListProps> = ({orders}) => {
    const {bindGo} = useNavigation();

    return <div className="divide-gray-200 divide-y">
        {orders.map(order => (
            <div key={order.id}>
                <HeightTransitioner>
                    <OrderListItem
                        key={order.id}
                        order={order}
                        onClick={bindGo(`/pedidos/${order.id}`)}
                    />
                </HeightTransitioner>
            </div>
        ))}
    </div>
};
