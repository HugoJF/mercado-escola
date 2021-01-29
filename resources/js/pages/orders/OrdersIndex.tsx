import React, {useEffect}   from "react";
import {Title}              from "../../components/ui/Title";
import {useOrders}          from "../../selectors";
import {useDispatch}        from "react-redux";
import {Dispatch}           from "../../store";
import {HeightTransitioner} from "../../components/ui/HeightTransitioner";
import {OrderListItem}      from "../../components/orders/OrderListItemProps";
import {PagePadding}        from "../../containers/PagePadding";
import {Empty}              from "../../components/ui/Empty";
import {useHistory}         from "react-router";


export const OrdersIndex: React.FC = () => {
    const history = useHistory();
    const dispatch = useDispatch<Dispatch>();
    const orders = useOrders();

    useEffect(() => {
        dispatch.orders.index();
        dispatch.addresses.index();
    }, []);

    function getOrders(): any[] {
        if (orders.orders === null) {
            return Array.from(Array(5).keys());
        } else {
            return Object.values(orders.orders)
        }
    }

    const orderList = getOrders();

    return <PagePadding className="flex flex-col">
        <Title>Meus pedidos</Title>

        {/* Empty warning */}
        {orderList.length === 0 && <div className="flex-grow flex flex-col justify-center">
            <Empty
                title="Nenhum pedido!"
                description="Você ainda não possui nenhum pedido registrado"
            />
        </div>}

        {/* Order list */}
        <div className="divide-gray-200 divide-y">
            {orderList.length !== 0 && orderList.map(order => (
                <div key={order.id}>
                    <HeightTransitioner>
                        <OrderListItem
                            key={order.id}
                            order={order}
                            onClick={() => history.push(`/pedidos/${order.id}`)}
                        />
                    </HeightTransitioner>
                </div>
            ))}
        </div>
    </PagePadding>
};
