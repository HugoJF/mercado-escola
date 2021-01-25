import React, {useState}       from "react";
import {useDispatch}           from "react-redux";
import {Dispatch}              from "../../store";
import {useHistory}            from "react-router-dom";
import {Title}                 from "../../components/ui/Title";
import {Plus}                  from "react-feather";
import {useAddresses, useAuth} from "../../selectors";
import useAsyncEffect          from "../../hooks/useAsyncEffect";
import {AddressList}           from "../../components/addresses/AddressList";
import {FlatButton}            from "../../components/ui/FlatButton";
import {PagePadding}           from "../../containers/PagePadding";
import useConfirmMenu          from "../../hooks/useConfirmMenu";

export const AddressesIndex: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch<Dispatch>();
    const auth = useAuth();
    const history = useHistory();
    const addresses = useAddresses();
    const [menu, confirm] = useConfirmMenu();

    useAsyncEffect(async () => {
        await dispatch.addresses.index();
        setLoading(false);
    }, []);

    async function handleOnContext() {
        const response = await confirm({
            title: 'Remover endereço?',
            description: 'Deseja permanentemente remover esse endereço?',
            action: 'Remover'
        });

        if (response) {
            alert('Endereco removido')
        }
    }

    return <PagePadding>
        {menu}
        <Title>Seus endereços</Title>

        <div className="my-4">
            <AddressList
                loading={loading}
                addresses={Object.values(addresses.addresses)}
                onContext={handleOnContext}
            />
        </div>

        <FlatButton
            onClick={() => history.push('/conta/endereco/novo')}
        >
            <span className="mr-4 text-lg">Adicionar novo endereço</span>
            <Plus/>
        </FlatButton>
    </PagePadding>
};
