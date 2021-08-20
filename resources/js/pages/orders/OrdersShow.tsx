import React from "react";
import {Title} from "@components/ui/Title";
import {Calendar, DollarSign, Info, MapPin} from "react-feather";
import {PriceFormatter} from "@components/ui/PriceFormatter";
import {PagePadding} from "@containers/PagePadding";
import {OrderType, OrderWithAddress, OrderWithOpening, OrderWithProducts} from "@type/orders";
import {Button} from "@components/ui/Button";
import useConfirmMenu from "@hooks/useConfirmMenu";
import {OrderStateBadge} from "@components/ui/OrderStateBadge";
import {OrderStateDescription} from "@components/ui/OrderStateDescription";
import {ProductListSummary} from "@components/products/ProductListSummary";
import {Date} from "@components/ui/Date";

export type OrdersShowProps = {
    order: OrderType<OrderWithAddress & OrderWithOpening & OrderWithProducts>;
    onCancel: (order: OrderType) => void;
}

export const OrdersShow: React.FC<OrdersShowProps> = ({order, onCancel}) => {
    const [menu, confirm] = useConfirmMenu();

    async function handleOnCancel() {
        const confirmed = await confirm({
            title: 'Cancelar o seu pedido?',
            description: <>
                O cancelamento do seu pedido <span className="font-mono">#{order.id}</span> é imediato.
            </>,
            action: 'Cancelar',
        });

        if (confirmed) {
            onCancel(order);
        }
    }

    return <PagePadding>
        {menu}
        <div className="flex flex-col justify-around min-h-full">
            <Title>
                <div className="flex justify-between">
                    <div>Pedido <span className="font-mono">#{order.id}</span></div>
                    <div><OrderStateBadge state={order.state}/></div>
                </div>
            </Title>

            <div className="my-6 flex items-center">
                <Info className="mr-4 flex-shrink-0 text-gray-500"/>
                <p className="text-gray-500">
                    <OrderStateDescription state={order.state}/>
                </p>
            </div>

            <Title>Valor total</Title>

            <div className="my-6 flex items-center">
                <DollarSign className="mr-4 flex-shrink-0 text-gray-500"/>
                <p className="text-gray-500">
                    {/* Product price */}
                    <span className="mr-1 text-secondary-500 font-medium">
                        <PriceFormatter price={order.products_cost}/>
                    </span>
                    em {order.products.length} {order.products.length === 1 ? 'item' : 'items'}

                    {/* Delivery fee */}
                    {order.address && <>
                        <span className="mx-1 font-medium">+</span>
                        <span className="mr-1 text-secondary-500 font-medium">
                            <PriceFormatter price={order.delivery_fee}/>
                        </span>
                        <span>taxa de entrega</span>
                    </>}
                </p>
            </div>

            {order.address && <>
                <Title>Endereço de entrega</Title>

                <div className="my-6 flex items-center">
                    <MapPin className="mr-4 flex-shrink-0 text-gray-500"/>
                    <p className="text-gray-500">
                        {order.address.address} {order.address.complement} {order.address.number}
                    </p>
                </div>
            </>}

            <Title>Data de entrega</Title>

            <div className="my-6 flex items-center">
                <Calendar className="mr-4 flex-shrink-0 text-gray-500"/>
                <p className="text-gray-500">
                    <span className="mr-1 text-secondary-500 font-medium">
                        {order.opening.delivers_at && <Date input={order.opening.delivers_at} format="dd/M/y"/>}
                    </span>
                    <span>
                        às {order.opening.delivers_at && <Date input={order.opening.delivers_at} format="H'h'"/>}
                    </span>
                </p>
            </div>

            <Title>Produtos</Title>

            <div className="my-6 px-2">
                <ProductListSummary
                    products={order.products}
                />
            </div>

            <Button
                color="danger"
                onClick={handleOnCancel}
            >
                Cancelar pedido
            </Button>
        </div>
    </PagePadding>
};
