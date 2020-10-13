import React                       from "react";
import {useDispatch}               from "react-redux";
import {Dispatch}                  from "../../store";
import {useHistory, useRouteMatch} from "react-router-dom";
import {Add, ChevronRight}         from "../../css.gg"
import {Title}                     from "../../components/Title";
import {Box}                       from "../../components/Box";

const addresses = [{
    name: 'Maria Casadevall',
    address: 'R. Alabama, 222',
    location: 'Campo Grande, Mato Grosso do Sul, 78554-255',
}, {
    name: 'Maria Casadevall',
    address: 'R. Alabama, 222',
    location: 'Campo Grande, Mato Grosso do Sul, 78554-255',
}, {
    name: 'Maria Casadevall',
    address: 'R. Alabama, 222',
    location: 'Campo Grande, Mato Grosso do Sul, 78554-255',
}, {
    name: 'Maria Casadevall',
    address: 'R. Alabama, 222',
    location: 'Campo Grande, Mato Grosso do Sul, 78554-255',
}];

export const Addresses: React.FC = ({children}) => {
    const dispatch = useDispatch<Dispatch>();
    const history = useHistory();
    const match = useRouteMatch();

    return <>
        <Title>Selecione o seu endereço</Title>

        <div className="my-8">
            {addresses.map(address => (
                <Box onClick={() => history.push('/conta')}>
                    <div className="flex-grow">
                        <h2 className="text-lg font-medium">{address.name}</h2>
                        <div className="pl-3">
                            <p className="text-gray-600">{address.address}</p>
                            <p className="text-sm text-gray-600 font-thin">{address.location}</p>
                        </div>
                    </div>
                    <ChevronRight className="text-gray-500"/>
                </Box>
            ))}
        </div>

        <div className="transition-all duration-150
            flex justify-center items-center
            w-full px-4 py-5 flex items-center bg-gray-200 hover:bg-gray-300 text-gray-600
            border-b last:border-b-0 border-gray-200 cursor-pointer"
        >
            <span className="mr-4 text-lg">Adicionar novo endereço</span>
            <Add/>
        </div>
    </>
};
