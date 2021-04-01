import React from "react";
import useConfirmMenu from "../../hooks/useConfirmMenu";
import {AddressType} from "../../types/addresses";
import {Loading} from "../../components/ui/Loading";
import {AddressesIndex} from "./AddressesIndex";
import {useAddresses} from "../../queries/useAddresses";
import {useAddressDestroy} from "../../mutations/useAddressDestroy";

export const AddressesIndexContainer: React.FC = () => {
    const [menu, confirm] = useConfirmMenu();

    const {status, data, error, isFetching} = useAddresses();
    const addressDestroy = useAddressDestroy();

    async function handleOnContext(address: AddressType) {
        const response = await confirm({
            title: 'Remover endereço?',
            description: 'Deseja permanentemente remover esse endereço?',
            action: 'Remover'
        });

        if (response) {
            addressDestroy.mutate(address.id);
        }
    }

    return data
        ?
        <>
            {menu}

            <AddressesIndex
                addresses={data.data}
                handleOnContext={handleOnContext}
            />
        </>
        :
        <Loading/>
};
