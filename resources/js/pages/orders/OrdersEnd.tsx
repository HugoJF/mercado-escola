import React                          from "react";
import {Button}                       from "../../components/Button";
import {Title}                        from "../../components/Title";
import {Calendar, DollarSign, MapPin} from "react-feather";


export const OrdersEnd: React.FC = ({children}) => {
    return <>
        <div className="flex flex-col justify-around min-h-full">
            <Title>Valor total</Title>

            <div className="my-8 flex items-center">
                <DollarSign className="mr-4 text-gray-500"/>
                <p className="text-gray-500">
                    <span className="mr-1 text-secondary-500 font-medium">R$ 3,14</span> em 1 item
                </p>
            </div>

            <Title>Endereço de entrega</Title>

            <div className="my-8 flex items-center">
                <MapPin className="mr-4 text-gray-500"/>
                <p className="text-gray-500">
                    R. Alabama, 222 - Campo Grande, MS
                </p>
            </div>

            <Title>Data de entrega</Title>

            <div className="my-8 flex items-center">
                <Calendar className="mr-4 text-gray-500"/>
                <p className="text-gray-500">
                    <span className="mr-1 text-secondary-500 font-medium">22/09/2020</span>entre 10h e 16h
                </p>
            </div>

            <Button>
                Continuar
            </Button>
        </div>
    </>
};
