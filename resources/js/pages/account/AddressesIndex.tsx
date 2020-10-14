import React, {useEffect}                        from "react";
import {useDispatch}                             from "react-redux";
import {Dispatch}                                from "../../store";
import {Link, useHistory, useRouteMatch}         from "react-router-dom";
import {Title}                                   from "../../components/Title";
import {Box}                                     from "../../components/Box";
import {CheckSquare, ChevronRight, Plus, Square} from "react-feather";
import {useAddresses}                            from "../../selectors";
import {Loading}                                 from "../../components/Loading";

export const AddressesIndex: React.FC = ({children}) => {
    const dispatch = useDispatch<Dispatch>();
    const history = useHistory();
    const match = useRouteMatch();
    const addresses = useAddresses();

    useEffect(() => {
        dispatch.addresses.index();
    }, []);

    return <>
        <Title>Selecione o seu endereço</Title>

        <div className="my-8">
            <Loading loading={addresses.loading}>
                {addresses.addresses && addresses.addresses.map(address => (
                    <Box onClick={() => history.push('/conta')}>
                        {address.deleted_at ?
                            <CheckSquare size={36} className="mr-8 text-secondary-500"/>
                            :
                            <Square size={36} className="mr-8 text-gray-400"/>
                        }
                        <div className="flex-grow">
                            <h2 className="text-lg font-medium">{address.complement}</h2>
                            <p className="text-gray-600">{address.address}</p>
                            <p className="text-sm text-gray-600 font-thin">{address.number}</p>
                        </div>
                        <ChevronRight className="text-gray-500"/>
                    </Box>
                ))}

            </Loading>
        </div>

        <Link
            to="/conta/endereco/novo"
            className="transition-all duration-150
                flex justify-center items-center
                w-full px-4 py-5 flex items-center bg-gray-200 hover:bg-gray-300 text-gray-600
                border-b last:border-b-0 border-gray-200 cursor-pointer"
        >
            <span className="mr-4 text-lg">Adicionar novo endereço</span>
            <Plus/>
        </Link>
    </>
};
