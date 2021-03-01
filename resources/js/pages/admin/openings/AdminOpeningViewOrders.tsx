import React                from "react";
import {OpeningType}        from "../../../types/openings";
import {HeightTransitioner} from "../../../components/ui/HeightTransitioner";
import {Title}              from "../../../components/ui/Title";
import {OrderListItem}      from "../../../components/orders/OrderListItemProps";
import {Empty}              from "../../../components/ui/Empty";

export type AdminOpeningViewOrdersProps = {
    opening: OpeningType;
}

export const AdminOpeningViewOrders: React.FC<AdminOpeningViewOrdersProps> = ({opening}) => {
    return <div className="px-4 py-4 space-y-6">
        <div className="space-y-3">
            <Title>Pedidos</Title>
            <Title sub>Pedidos realizados durante essa abertura.</Title>
        </div>

        <div className="divide-y divide-gray-200">
            {opening.orders.length === 0 && <Empty
                title="Nenhum pedido"
                description="Nenhum pedido foi realizado durante essa abertura"
                iconSize={48}
            />}

            {opening.orders.map(order => (
                <HeightTransitioner key={order.id}>
                    <OrderListItem order={order}/>
                </HeightTransitioner>
            ))}
        </div>
    </div>
};
