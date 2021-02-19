import React            from "react";
import {useDispatch}    from "react-redux";
import {Dispatch}       from "../../store";
import useConfirmMenu   from "../../hooks/useConfirmMenu";
import {AddressType}    from "../../types/addresses";
import {Loading}        from "../../components/ui/Loading";
import {AddressesIndex} from "./AddressesIndex";
import {useAddresses}   from "../../queries/useAddresses";

export const AddressesIndexContainer: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const [menu, confirm] = useConfirmMenu();

    const {status, data, error, isFetching} = useAddresses();

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
