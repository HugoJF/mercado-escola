import React from "react";
import {Button} from "../../components/ui/Button";
import {Approve} from "../../svg/approve";
import {Link} from "react-router-dom";
import {OrderType} from "../../types/orders";
import {OpeningType} from "../../types/openings";
import {AddressType} from "../../types/addresses";
import {PagePadding} from "../../containers/PagePadding";
import {Date} from "../../components/ui/Date";

export type OrderDoneProps = {
    order: OrderType;
    opening: OpeningType;
    address?: AddressType;
}

export const OrderDone: React.FC<OrderDoneProps> = ({order, opening, address}) => {
    return <PagePadding className="flex flex-col justify-around min-h-full text-center">
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
                        <>Seus <span className="text-gray-700 font-medium ">{order.products.length}</span> produtos
                            serão entregues no dia </>
                    }

                    <span className="mr-1 text-secondary-500 font-medium">
                        {opening.delivers_at && <Date input={opening.delivers_at} format="dd/M/y"/>}
                        </span>
                    <span>às </span>
                    <span className="mr-1 text-secondary-500 font-medium">
                        {opening.delivers_at && <Date input={opening.delivers_at} format="H"/>}
                    </span>
                    <span>no endereço:</span>
                </p>
                :
                <p className="text-gray-500">
                    <span>Seu pedido estará disponível para retirada no dia </span>
                    <span className="mr-1 text-secondary-500 font-medium">
                        {opening.delivers_at && <Date input={opening.delivers_at} format="dd/M/y"/>}
                    </span>
                    <span>às </span>
                    <span className="mr-1 text-secondary-500 font-medium">
                        {opening.delivers_at && <Date input={opening.delivers_at} format="H'h'"/>}
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
    </PagePadding>
};
