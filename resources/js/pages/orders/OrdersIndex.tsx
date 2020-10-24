import React, {useEffect} from "react";
import useRelativePath    from "../../hooks/useRelativePath";
import {Title}            from "../../components/Title";
import {MoreVertical}     from "react-feather";
import {PriceFormatter}   from "../../components/PriceFormatter";
import {Link}             from "react-router-dom";
import {OrderType}        from "../../models/orders";
import {useOrders}        from "../../selectors";
import {useDispatch}      from "react-redux";
import {Dispatch}         from "../../store";
import {format, parseISO} from 'date-fns'
import {ptBR}             from 'date-fns/locale'
import {Skeleton}         from "../../components/Skeleton";
import {OrderStateText}   from "../../components/OrderStateText";

const OrderList: React.FC<{ order: OrderType }> = ({order, children}) => {
    const relative = useRelativePath();
    const createdAt = order.created_at ? parseISO(order.created_at) : null;

    return <Link to={`/pedidos/${order.id}`} className="py-3 flex items-center">
        {/* Date */}
        <div className="h-20 w-16 flex flex-col items-center justify-center bg-gray-200">
            <span className="text-xl text-gray-900 font-medium">
                {createdAt && format(createdAt, 'd', {locale: ptBR})}
            </span>
            <span className="text-lg text-gray-500">
                {createdAt && format(createdAt, 'E', {locale: ptBR})}
            </span>
        </div>

        {/* Details */}
        <div className="ml-4 flex-grow">
            <div className="flex flex-grow justify-between">
                <h2 className="flex-grow text-xl text-gray-900">
                    {order.id ?
                        `#${order.id}`
                        :
                        <Skeleton className="w-1/2"/>
                    }
                </h2>
                <MoreVertical className="text-gray-500"/>
            </div>
            <div className="mt-4 flex flex-grow justify-between items-center">
                <ul className="text-sm text-gray-500">
                    <li>
                        <span>Produtos: </span>
                        <span className="inline-block text-secondary-600 font-medium">
                            {order.products?.length || <Skeleton className="w-4"/>}
                        </span>
                    </li>
                    <li>
                        <span>Custo: </span>
                        <span className="inline-block text-secondary-600 font-medium">
                            {order.cost ?
                                <PriceFormatter cents price={order.cost}/>
                                :
                                <Skeleton className="w-8"/>
                            }
                        </span>
                    </li>
                </ul>
                {order.state &&
                <span className="py-1 px-3 text-sm text-primary-100 font-medium bg-primary-600 rounded-full">
                        <OrderStateText state={order.state}/>
                    </span>
                }
            </div>
        </div>
    </Link>
};

export const OrdersIndex: React.FC = ({children}) => {
    const dispatch = useDispatch<Dispatch>();
    const relative = useRelativePath();
    const orders = useOrders();

    useEffect(() => {
        dispatch.orders.index();
    }, []);

    function getOrders() {
        if (Object.values(orders.orders)?.length) {
            return Object.values(orders.orders)
        } else {
            return Array(5).fill({});
        }
    }

    return <>
        <Title>Meus pedidos</Title>

        {getOrders().map(order => (
            <OrderList key={order.id} order={order}/>
        ))}
    </>
};
