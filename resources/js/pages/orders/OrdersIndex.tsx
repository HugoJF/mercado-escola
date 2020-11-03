import React, {useEffect}         from "react";
import {Title}                    from "../../components/ui/Title";
import {PriceFormatter}           from "../../components/ui/PriceFormatter";
import {Link}                     from "react-router-dom";
import {OrderType}                from "../../models/orders";
import {useAddresses, useOrders}  from "../../selectors";
import {useDispatch}              from "react-redux";
import {Dispatch}                 from "../../store";
import {formatDistance, parseISO} from 'date-fns'
import {Skeleton}                 from "../../components/ui/Skeleton";
import {OrderStateBadge}          from "../../components/ui/OrderStateBadge";
import {HeightTransitioner}       from "../../components/ui/HeightTransitioner";
import {ptBR}                     from "date-fns/locale";
import {MoreVertical}             from "react-feather";

const OrderList: React.FC<{ order: OrderType }> = ({order, children}) => {
    const addresses = useAddresses();
    const createdAt = order.created_at ? parseISO(order.created_at) : null;

    const address = addresses.addresses[order.address_id];

    return <Link to={`/pedidos/${order.id}`} className="py-5 flex items-center">
        {/* Details */}
        <div className="flex-grow">
            {/* Header */}
            <div className="flex flex-grow justify-between">
                <h2 className="flex-grow text-lg text-gray-900 font-mono tracking-tighter">
                    {order.id ?
                        `#${order.id}`
                        :
                        <Skeleton className="w-1/2"/>
                    }
                </h2>
                {order.state && <OrderStateBadge state={order.state}/>}
            </div>

            {/* Address line */}
            <p className="my-2 text-sm text-gray-400">
                {order.address_id ? address?.address
                    ||
                    <Skeleton className="w-2/3"/>
                    :
                    <>Pedido para retirada</>}
            </p>

            {/* Details line */}
            <ul className="flex text-sm text-gray-500">
                {/* Product quantity */}
                {order.products?.length ?
                    <li>
                            <span className="inline-block text-secondary-600 font-medium">
                                {order.products?.length}
                            </span>
                        <span> {order.products?.length === 1 ? 'produto' : 'produtos'}</span>
                    </li>
                    :
                    <Skeleton className="w-16"/>
                }

                {/* Separator */}
                <span className="mx-2 font-bold text-gray-500">·</span>

                {/* Order cost */}
                <li>
                        <span className="inline-block text-secondary-600 font-medium">
                            {order.cost ?
                                <PriceFormatter cents price={order.cost}/>
                                :
                                <Skeleton className="w-8"/>
                            }
                        </span>
                </li>

                {/* Separator */}
                <span className="mx-2 font-bold text-gray-500">·</span>

                {/* Order cost */}
                <li>
                    {createdAt ?
                        formatDistance(createdAt, new Date(), {addSuffix: true, locale: ptBR})
                        :
                        <Skeleton className="w-8"/>
                    }
                </li>

                <div className="flex flex-grow justify-end text-gray-600">
                    <MoreVertical/>
                </div>
            </ul>
        </div>
    </Link>
};

export const OrdersIndex: React.FC = ({children}) => {
    const dispatch = useDispatch<Dispatch>();
    const orders = useOrders();

    useEffect(() => {
        dispatch.orders.index();
        dispatch.addresses.index();
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
            <div className="border-b last:border-b-0">
                <HeightTransitioner>
                    <OrderList key={order.id} order={order}/>
                </HeightTransitioner>
            </div>
        ))}
    </>
};
