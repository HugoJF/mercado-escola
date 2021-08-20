import React from "react";
import {Title} from "@components/ui/Title";
import {AddressList} from "@components/addresses/AddressList";
import {PagePadding} from "@containers/PagePadding";
import {ChevronRight} from "react-feather";
import useNavigation from "@hooks/useNavigation";
import {useAddresses} from "@queries/useAddresses";
import {Loading} from "@components/ui/Loading";
import {AddressType} from "@type/addresses";
import {useCartAddress} from "@mutations/useCartAddress";

export const CartAddress: React.FC = () => {
    const {go} = useNavigation();

    const addresses = useAddresses();
    const updateCartAddress = useCartAddress();

    if (!addresses.data) {
        return <Loading/>
    }

    function handleClick(address: AddressType) {
        updateCartAddress.mutate(address.id);
        go('/carrinho')
    }

    return <PagePadding>
        <Title>Selecione o endereço da entrega</Title>

        <div className="my-8">
            <AddressList
                addresses={addresses.data.data}
                contextIcon={ChevronRight}
                onClick={handleClick}
            />
        </div>
    </PagePadding>
};
