import React from "react";
import {OrderType} from "../../types/orders";
import {formatDistance, parseISO} from "date-fns";
import {Skeleton} from "../ui/Skeleton";
import {OrderStateBadge} from "../ui/OrderStateBadge";
import {PriceFormatter} from "../ui/PriceFormatter";
import {ptBR} from "date-fns/locale";
import {Box} from "../ui/Box";

export type OrderListItemProps = {
    order: OrderType;
    onClick?: () => void;
}

export const OrderListItem: React.FC<OrderListItemProps> = ({order, onClick}) => {
    const createdAt = parseISO(order.created_at);

    function handleClick() {
        if (onClick) {
            onClick()
        }
    }

    return <Box onClick={handleClick}>
        <div className="w-full flex items-center">
            {/* Details */}
            <div className="flex-grow">
                {/* Header */}
                <div className="flex flex-grow justify-between">
                    <h2 className="flex-grow text-lg text-gray-900 font-mono tracking-tighter">
                        #{order.id}
                    </h2>

                    <OrderStateBadge state={order.state}/>
                </div>

                {/* Address line */}
                <p className="my-2 text-sm text-gray-400">
                    {!order.address_id ?
                        <>Pedido para retirada</>
                        :
                        order.address?.address
                    }
                </p>

                {/* Details line */}
                <ul className="flex text-sm text-gray-500">
                    {/* Order datetime */}
                    <li>
                        {formatDistance(createdAt, new Date(), {addSuffix: true, locale: ptBR})}
                    </li>

                    {/* Separator */}
                    <span className="mx-2 font-bold text-gray-500">·</span>

                    {/* Order cost */}
                    <li>
                        <span className="inline-block text-secondary-600 font-medium">
                            {order.total ?
                                <PriceFormatter price={order.total}/>
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
                </ul>
            </div>
        </div>
    </Box>
};
