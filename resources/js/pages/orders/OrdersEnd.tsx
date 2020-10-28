import React, {useEffect}                                  from "react";
import {Button}                                            from "../../components/ui/Button";
import {Title}                                             from "../../components/ui/Title";
import {Calendar, CheckSquare, DollarSign, MapPin, Square} from "react-feather";
import {Box}                                               from "../../components/ui/Box";
import {useParams}                                         from "react-router";
import {useDispatch}                                       from "react-redux";
import {Dispatch}                                          from "../../store";
import {useAddresses, useOpenings, useOrders}              from "../../selectors";
import {PriceFormatter}                                    from "../../components/ui/PriceFormatter";
import {format, parseISO}                                  from "date-fns";
import {ptBR}                                              from "date-fns/locale";

const status = [{
    title: 'Pedido foi aceito',
    done: true,
    date: '14h24 - 10/09/2020'
}, {
    title: 'Pedido está pronto',
    done: true,
    date: '11h01 - 11/09/2020'
}, {
    title: 'Pedido sendo entregue',
    done: false,
    date: '15h15 - 14/09/2020'
},];

export const OrdersEnd: React.FC = ({children}) => {
    const dispatch = useDispatch<Dispatch>();
    const params = useParams<{ orderId: string }>();
    const orders = useOrders();
    const addresses = useAddresses();
    const openings = useOpenings();


    useEffect(() => {
        dispatch.orders.index();
        dispatch.addresses.index();
        dispatch.openings.index();
    }, []);

    const order = orders.orders[params.orderId];

    if (!order) {
        return null;
    }

    const opening = openings.openings[order.opening_id];

    if (!opening) {
        return null;
    }

    const deliversAt = opening.delivers_at ? parseISO(opening.delivers_at) : null;

    const address = order.address_id && addresses.addresses[order.address_id];

    return <>
        <div className="flex flex-col justify-around min-h-full">
            <Title>Situação</Title>

            <div className="px-2">
                {status.map((s => (
                    <Box>
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

            <Title>Valor total</Title>

            <div className="my-8 flex items-center">
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

                <div className="my-8 flex items-center">
                    <MapPin className="mr-4 flex-shrink-0 text-gray-500"/>
                    <p className="text-gray-500">
                        {address.address} {address.complement} {address.number}
                    </p>
                </div>
            </>}

            <Title>Data de entrega</Title>

            <div className="my-8 flex items-center">
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

            <Button>
                Continuar
            </Button>
        </div>
    </>
};
