import React                                               from "react";
import {Button}                                            from "../../components/Button";
import {Title}                                             from "../../components/Title";
import {Calendar, CheckSquare, DollarSign, MapPin, Square} from "react-feather";
import {Box}                                               from "../../components/Box";

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
