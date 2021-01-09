import React, {useEffect}   from "react";
import {Title}              from "../../components/ui/Title";
import {useOrders}          from "../../selectors";
import {useDispatch}        from "react-redux";
import {Dispatch}           from "../../store";
import {HeightTransitioner} from "../../components/ui/HeightTransitioner";
import {OrderList}          from "../../components/orders/OrderList";
import {PagePadding}        from "../../containers/PagePadding";
import {Empty}              from "../../components/ui/Empty";


export const OrdersIndex: React.FC = ({children}) => {
    const dispatch = useDispatch<Dispatch>();
    const orders = useOrders();

    useEffect(() => {
        dispatch.orders.index();
        dispatch.addresses.index();
    }, []);

    function getOrders(): any[] {
        if (Object.values(orders.orders)?.length) {
            return Object.values(orders.orders)
        } else {
            return Array.from(Array(5).keys());
        }
    }

    const orderList = getOrders();

    return <PagePadding className="flex flex-col">
        <Title>Meus pedidos</Title>

        {/* Empty warning */}
        {orderList.length === 0 && <div className="flex-grow flex flex-col justify-center">
            {orderList.length === 0 && <Empty
                title="Nenhum pedido!"
                description="Você ainda não possui nenhum pedido registrado"
            />}
        </div>}

        {orderList.length !== 0 && orderList.map(order => (
            <div key={order.id} className="border-b last:border-b-0">
                <HeightTransitioner>
                    <OrderList key={order.id} order={order}/>
                </HeightTransitioner>
            </div>
        ))}
    </PagePadding>
};
