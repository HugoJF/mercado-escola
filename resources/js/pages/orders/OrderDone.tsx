import React              from "react";
import {Button}           from "../../components/ui/Button";
import {Approve}          from "../../svg/approve";
import {Link}             from "react-router-dom";
import {format, parseISO} from "date-fns";
import {ptBR}             from "date-fns/locale";
import {OrderType}        from "../../models/orders";
import {OpeningType}      from "../../models/openings";
import {AddressType}      from "../../models/addresses";

export type OrderDoneProps = {
    order: OrderType,
    opening: OpeningType,
    address?: AddressType,
}

export const OrderDone: React.FC<OrderDoneProps> = ({order, opening, address}) => {
    const deliversAt = opening.delivers_at ? parseISO(opening.delivers_at) : null;

    return <>
        <div className="flex flex-col justify-around min-h-full text-center">
            {/* Header */}
            <div className="space-y-4">
                <h1 className="text-2xl text-gray-700 font-bold">Obrigado pelo pedido!</h1>
                <h2 className="text-lg text-gray-500">Seu pedido foi registrado com sucesso!</h2>
            </div>

            {/* Illustration */}
            <div className="mx-auto flex flex-shrink-0 items-center justify-center h-64 w-64">
                <Approve/>
            </div>

            {/* Delivery/takeout information */}
            <div className="space-y-4">
                {address ?
                    <p className="text-gray-500">
                        {order.products.length === 1
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
                    :
                    <p className="text-gray-500">
                        <span>Seu pedido estará disponível para retirada no dia </span>
                        <span className="mr-1 text-secondary-500 font-medium">
                            {deliversAt && format(deliversAt, 'dd/M/y', {locale: ptBR})}
                        </span>
                        <span>às </span>
                        <span className="mr-1 text-secondary-500 font-medium">
                            {deliversAt && format(deliversAt, 'H', {locale: ptBR})}h
                        </span>
                    </p>
                }

                {/* Address */}
                {address && <p className="text-gray-700 font-medium tracking-tight">
                    {address.address}
                </p>}
            </div>

            {/* CTA */}
            <Link to="/pedidos">
                <Button>
                    Meus pedidos
                </Button>
            </Link>
        </div>
    </>
};
