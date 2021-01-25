import React, {useEffect}   from "react";
import {OpeningType}        from "../../models/openings";
import {useOrders}          from "../../selectors";
import {HeightTransitioner} from "../../components/ui/HeightTransitioner";
import {useDispatch}        from "react-redux";
import {Dispatch}           from "../../store";
import {Title}              from "../../components/ui/Title";
import {OrderListItem}      from "../../components/orders/OrderListItemProps";

export type AdminOpeningViewOrdersProps = {
    opening: OpeningType;
}

export const AdminOpeningViewOrders: React.FC<AdminOpeningViewOrdersProps> = ({opening}) => {
    const dispatch = useDispatch<Dispatch>();
    const orders = useOrders();

    useEffect(() => {
        dispatch.orders.index();
        dispatch.openings.index();
    }, []);

    function getOrders(): any[] {
        if (orders.orders === null) {
            return Array.from(Array(5).keys());
        } else {
            return Object.values(orders.orders)
        }
    }

    const orderList = getOrders();

    // TODO: fix this
    if (!opening) return <></>;

    return <div className="px-4 py-4 space-y-6">
        <div className="space-y-3">
            <Title>Pedidos</Title>
            <Title sub>Pedidos realizados durante essa abertura.</Title>
        </div>

        <div className="divide-y divide-gray-200">
            {orderList.length !== 0 && orderList.map(order => (
                <HeightTransitioner>
                    <OrderListItem key={order.id} order={order}/>
                </HeightTransitioner>
            ))}
        </div>
    </div>
};
