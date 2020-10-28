import React, {useState}           from "react";
import {useDispatch}               from "react-redux";
import {Dispatch}                  from "../../store";
import {useHistory, useRouteMatch} from "react-router-dom";
import {Title}                     from "../../components/ui/Title";
import {Plus}                      from "react-feather";
import {useAddresses, useAuth}     from "../../selectors";
import useAsyncEffect              from "../../hooks/useAsyncEffect";
import {AddressList}               from "../../components/address/AddressList";
import {FlatButton}                from "../../components/ui/FlatButton";
import {AddressType}               from "../../models/addresses";

export const AddressesIndex: React.FC = ({children}) => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch<Dispatch>();
    const auth = useAuth();
    const history = useHistory();
    const addresses = useAddresses();

    useAsyncEffect(async () => {
        await dispatch.addresses.index();
        setLoading(false);
    }, []);

    async function handleAddressClick(address: AddressType) {
        await dispatch.auth.update({main_address: address.id});
    }

    return <>
        <Title>Selecione o seu endereço</Title>

        <div className="px-2 my-8">
            <AddressList
                selected={auth.me?.main_address as number|undefined}
                loading={loading}
                addresses={Object.values(addresses.addresses)}
                onClick={handleAddressClick}
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
