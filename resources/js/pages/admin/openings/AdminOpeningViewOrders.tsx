import React, {useState} from "react";
import {OpeningType} from "@type/openings";
import {HeightTransitioner} from "@components/ui/HeightTransitioner";
import {Title} from "@components/ui/Title";
import {OrderListItem} from "@components/orders/OrderListItemProps";
import {Empty} from "@components/ui/Empty";
import {OrderStatusActionMenu} from "@menus/OrderStatusActionMenu";
import {useOrderUpdate} from "@mutations/useOrderUpdate";
import {OrderStateEnum} from "@type/orders";

export type AdminOpeningViewOrdersProps = {
    opening: OpeningType;
}

export const AdminOpeningViewOrders: React.FC<AdminOpeningViewOrdersProps> = ({opening}) => {
    const [id, setId] = useState('');
    const [state, setState] = useState(OrderStateEnum.PENDING);
    const [orderStatusMenuOpen, setOrderStatusMenuOpen] = useState(false);

    const orderUpdate = useOrderUpdate();

    async function handleOrderStatusUpdate(state: OrderStateEnum) {
        await orderUpdate.mutateAsync({
            id: id,
            data: {state: state},
        });
    }

    return <div className="px-4 py-4 space-y-6">
        <OrderStatusActionMenu
            open={orderStatusMenuOpen}
            state={state}
            onUpdate={handleOrderStatusUpdate}
            onClose={() => setOrderStatusMenuOpen(false)}
        />

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
                    <OrderListItem
                        order={order}
                        onClick={() => {
                            setId(order.id);
                            setState(order.state);
                            setOrderStatusMenuOpen(true);
                        }}
                    />
                </HeightTransitioner>
            ))}
        </div>
    </div>
};
