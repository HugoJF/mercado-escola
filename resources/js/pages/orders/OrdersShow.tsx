import React                              from "react";
import {Link}                             from "react-router-dom";
import {Button}                           from "../../components/Button";
import {Title}                            from "../../components/Title";
import {Calendar, Heart, MapPin, XSquare} from "react-feather";


export const OrdersShow: React.FC = ({children}) => {
    return <>
        <div className="flex flex-col justify-around min-h-full">
            <Title>Carrinho</Title>

            <div className="border-b border-gray-200">
                {Array(3).fill(0).map(() => (
                    <div className="flex my-8">
                        <div className="w-24 h-20 bg-gray-300 rounded-lg"/>
                        <div className="px-4 flex-grow">
                            <h3 className="text-xl font-medium">Brócolis</h3>
                            <p className="text-gray-500">200g</p>
                            <p className="mt-2 text-secondary-500 font-medium">R$ 3,14</p>
                        </div>
                        <div className="flex items-center">
                            <Heart className="ml-8 cursor-pointer"/>
                            <XSquare className="ml-8 text-red-600 cursor-pointer"/>
                        </div>
                    </div>
                ))}
            </div>

            <div className="my-8 flex justify-between items-baseline text-xl">
                <span className="text-gray-500">Valor total</span>
                <span className="text-secondary-500 font-medium">R$ 3,14</span>
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
                <Link to="/pedidos/1">
                    Finalizar pedido
                </Link>
            </Button>
        </div>
    </>
};
