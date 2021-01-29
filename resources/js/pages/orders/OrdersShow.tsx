import React                                               from "react";
import {Title}                                             from "../../components/ui/Title";
import {Calendar, CheckSquare, DollarSign, MapPin, Square} from "react-feather";
import {Box}                                               from "../../components/ui/Box";
import {PriceFormatter}                                    from "../../components/ui/PriceFormatter";
import {format, parseISO}                                  from "date-fns";
import {ptBR}                                              from "date-fns/locale";
import {PagePadding}                                       from "../../containers/PagePadding";
import {OrderType}                                         from "../../models/orders";
import {OpeningType}                                       from "../../models/openings";
import {AddressType}                                       from "../../models/addresses";
import {Button}                                            from "../../components/ui/Button";
import useConfirmMenu                                      from "../../hooks/useConfirmMenu";
import {ProductListSummary}                                from "../../components/products/ProductListSummary";
import {ProductType}                                       from "../../models/products";

export type OrdersShowProps = {
    order: OrderType;
    products: ProductType[];
    quantities: { [productId: number]: number }
    opening: OpeningType;
    address?: AddressType;
    status: any[];
    onCancel: (order: OrderType) => void;
}

export const OrdersShow: React.FC<OrdersShowProps> = ({order, products, quantities, opening, address, status, onCancel}) => {
    const [menu, confirm] = useConfirmMenu();

    const deliversAt = opening.delivers_at ? parseISO(opening.delivers_at) : null;

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
            <Title>Situação do pedido <span className="font-mono">#{order.id}</span></Title>

            <div className="px-2 my-6 divide-y">
                {status.map(((s, i) => (
                    <Box key={i}>
                        {s.done ?
                            <CheckSquare size={24} className="mr-4 flex-shrink-0 text-secondary-500"/>
                            :
                            <Square size={24} className="mr-4 flex-shrink-0 text-gray-400"/>
                        }
                        <h4 className={`mr-3 ${s.done ? 'text-gray-400' : 'text-gray-600 font-medium'}`}>
                            {s.title}
                        </h4>
                        <span className="ml-auto flex-shrink-0 text-xs text-gray-400 tracking-tighter">
                            {s.date}
                        </span>
                    </Box>
                )))}

            </div>

            <Title>Produtos</Title>

            <div className="my-6 px-2">
                <ProductListSummary
                    products={products}
                    quantities={quantities}
                />
            </div>

            <Title>Valor total</Title>

            <div className="my-6 flex items-center">
                <DollarSign className="mr-4 text-gray-500"/>
                <p className="text-gray-500">
                    <span className="mr-1 text-secondary-500 font-medium">
                        <PriceFormatter price={order.cost} cents/>
                    </span>
                    em {order.products.length} {order.products.length === 1 ? 'item' : 'items'}
                </p>
            </div>

            {address && <>
                <Title>Endereço de entrega</Title>

                <div className="my-6 flex items-center">
                    <MapPin className="mr-4 flex-shrink-0 text-gray-500"/>
                    <p className="text-gray-500">
                        {address.address} {address.complement} {address.number}
                    </p>
                </div>
            </>}

            <Title>Data de entrega</Title>

            <div className="my-6 flex items-center">
                <Calendar className="mr-4 text-gray-500"/>
                <p className="text-gray-500">
                    <span className="mr-1 text-secondary-500 font-medium">
                        {deliversAt && format(deliversAt, 'dd/M/y', {locale: ptBR})}
                    </span>
                    <span>
                        às {deliversAt && format(deliversAt, 'H', {locale: ptBR})}h
                    </span>
                </p>
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
