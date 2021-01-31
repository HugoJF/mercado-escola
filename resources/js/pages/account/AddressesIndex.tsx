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
import useLoadEffect           from "../../hooks/useLoadEffect";
import {AddressType}           from "../../models/addresses";
import {Empty}                 from "../../components/ui/Empty";

export const AddressesIndex: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const history = useHistory();
    const addresses = useAddresses();
    const [menu, confirm] = useConfirmMenu();

    const loading = useLoadEffect(async () => {
        await dispatch.addresses.index();
    }, []);

    async function handleOnContext(address: AddressType) {
        const response = await confirm({
            title: 'Remover endereço?',
            description: 'Deseja permanentemente remover esse endereço?',
            action: 'Remover'
        });

        if (response) {
            dispatch.addresses.destroy(address.id);
        }
    }

    return <PagePadding>
        {menu}
        <Title>Seus endereços</Title>

        {Object.values(addresses.addresses).length === 0 && !loading && <div className="my-8">
            <Empty
                title="Nenhum endereço!"
                description="Você ainda não registrou um endereço de entrega"
            />
        </div>}

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
