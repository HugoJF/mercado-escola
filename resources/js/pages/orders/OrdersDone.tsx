import React, {useEffect}       from "react";
import {Button}                 from "../../components/ui/Button";
import {Approve}                from "../../svg/approve";
import {Link}                   from "react-router-dom";
import {useDispatch}            from "react-redux";
import {Dispatch}               from "../../store";
import {useParams}                            from "react-router";
import {useAddresses, useOpenings, useOrders} from "../../selectors";
import {format, parseISO}                     from "date-fns";
import {ptBR}                   from "date-fns/locale";

export const OrdersDone: React.FC = ({children}) => {
    const dispatch = useDispatch<Dispatch>();
    const params = useParams<{ orderId: string }>();
    const orders = useOrders();
    const openings = useOpenings();
    const addresses = useAddresses();

    useEffect(() => {
        dispatch.orders.index();
        dispatch.openings.index();
        dispatch.addresses.index();
    }, []);

    const order = orders.orders[params.orderId];

    if (!order) {
        return null;
    }

    const opening = openings.openings[order.opening_id];

    if (!opening) {
        return null;
    }

    const address = addresses.addresses[order.address_id];

    if (!address) {
        return null;
    }

    const deliversAt = opening.delivers_at ? parseISO(opening.delivers_at) : null;

    return <>
        <div className="flex flex-col justify-around min-h-full text-center">
            <div className="space-y-4">
                <h1 className="text-2xl text-gray-700 font-bold">Obrigado pelo pedido!</h1>
                <h2 className="text-lg text-gray-500">Seu pedido foi registrado com sucesso!</h2>
            </div>

            <div className="mx-auto flex flex-shrink-0 items-center justify-center h-64 w-64">
                <Approve/>
            </div>

            <div className="space-y-4">
                <p className="text-gray-500">
                    {
                        order.products.length === 1
                            ?
                            <>Seu item será entregue no dia </>
                            :
                            <>Seus <span className="text-gray-700 font-medium ">7</span> itens serão entregues no dia </>
                    }

                    <span className="mr-1 text-secondary-500 font-medium">
                        {deliversAt && format(deliversAt, 'dd/M/y', {locale: ptBR})}
                    </span>
                    <span>às </span>
                    <span className="mr-1 text-secondary-500 font-medium">
                        {deliversAt && format(deliversAt, 'H', {locale: ptBR})}h
                    </span>
                    <span>no endereço:</span>
                </p>
                <p className="text-gray-700 font-medium tracking-tight">
                    {address.address}
                </p>
            </div>


            <Link to="/pedidos">
                <Button>
                    Meus pedidos
                </Button>
            </Link>
        </div>
    </>
};
