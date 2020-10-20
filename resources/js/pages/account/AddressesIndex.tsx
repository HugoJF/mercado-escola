import React, {useState}                 from "react";
import {useDispatch}                     from "react-redux";
import {Dispatch}                        from "../../store";
import {Link, useHistory, useRouteMatch} from "react-router-dom";
import {Title}                           from "../../components/Title";
import {Plus}                            from "react-feather";
import {useAddresses}                    from "../../selectors";
import useAsyncEffect                    from "../../hooks/useAsyncEffect";
import {AddressList}                     from "../../components/AddressList";
import {FlatButton}                      from "../../components/FlatButton";

export const AddressesIndex: React.FC = ({children}) => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch<Dispatch>();
    const history = useHistory();
    const match = useRouteMatch();
    const addresses = useAddresses();

    useAsyncEffect(async () => {
        await dispatch.addresses.index();
        setLoading(false);
    }, []);

    return <>
        <Title>Selecione o seu endereço</Title>

        <div className="px-2 my-8">
            <AddressList
                loading={loading}
                addresses={Object.values(addresses.addresses)}
                onClick={() => history.push('/conta')}
            />
        </div>

        <FlatButton
            onClick={() => history.push('/conta/endereco/novo')}
            className="transition-all duration-150
                flex justify-center items-center
                w-full px-4 py-5 flex items-center bg-gray-200 hover:bg-gray-300 text-gray-600
                border-b last:border-b-0 border-gray-200 cursor-pointer"
        >
            <span className="mr-4 text-lg">Adicionar novo endereço</span>
            <Plus/>
        </FlatButton>
    </>
};
