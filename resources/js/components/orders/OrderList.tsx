import React                      from "react";
import {OrderType}                from "../../models/orders";
import {useAddresses}             from "../../selectors";
import {formatDistance, parseISO} from "date-fns";
import {Link}                     from "react-router-dom";
import {Skeleton}                 from "../ui/Skeleton";
import {OrderStateBadge}          from "../ui/OrderStateBadge";
import {PriceFormatter}           from "../ui/PriceFormatter";
import {ptBR}                     from "date-fns/locale";
import {MoreVertical}             from "react-feather";

export const OrderList: React.FC<{ order: OrderType }> = ({order, children}) => {
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
                {order?.id ?
                    (!order.address_id ?
                            <>Pedido para retirada</>
                            :
                            address?.address
                    )
                    :
                    <Skeleton className="w-2/3"/>
                }
            </p>

            {/* Details line */}
            <ul className="flex text-sm text-gray-500">
                {/* Order datetime */}
                <li>
                    {createdAt ?
                        formatDistance(createdAt, new Date(), {addSuffix: true, locale: ptBR})
                        :
                        <Skeleton className="w-8"/>
                    }
                </li>

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

                <div className="flex flex-grow justify-end text-gray-600">
                    <MoreVertical/>
                </div>
            </ul>
        </div>
    </Link>
};
