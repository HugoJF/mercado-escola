import React          from "react";
import {useDispatch}  from "react-redux";
import {Dispatch}     from "../../store";
import {Title}        from "../../components/ui/Title";
import {Plus}         from "react-feather";
import {AddressList}  from "../../components/addresses/AddressList";
import {FlatButton}   from "../../components/ui/FlatButton";
import {PagePadding}  from "../../containers/PagePadding";
import useConfirmMenu from "../../hooks/useConfirmMenu";
import {AddressType}  from "../../types/addresses";
import {Empty}        from "../../components/ui/Empty";
import useNavigation  from "../../hooks/useNavigation";
import {useQuery}     from "react-query";
import {api}          from "../../api";
import {isEmpty}      from "../../helpers/Functions";

export type AddressesIndexProps = {
    addresses: AddressType[];
    handleOnContext: (address: AddressType) => void;
}

export const AddressesIndex: React.FC<AddressesIndexProps> = ({addresses, handleOnContext}) => {
    const {bindGo} = useNavigation();

    return <PagePadding>
        <Title>Seus endereços</Title>

        {isEmpty(addresses) && <div className="my-8">
            <Empty
                title="Nenhum endereço!"
                description="Você ainda não registrou um endereço de entrega"
            />
        </div>}

        <div className="my-4">
            <AddressList
                addresses={addresses}
                onContext={handleOnContext}
            />
        </div>

        <FlatButton
            onClick={bindGo('/conta/endereco/novo')}
            text="Adicionar novo endereço"
            icon={Plus}
        />
    </PagePadding>
};
