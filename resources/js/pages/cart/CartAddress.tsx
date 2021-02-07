import React, {useState} from "react";
import {useHistory}      from "react-router-dom";
import {Title}           from "../../components/ui/Title";
import {useAddresses}    from "../../selectors";
import {useDispatch}     from "react-redux";
import {Dispatch}        from "../../store";
import {AddressList}     from "../../components/addresses/AddressList";
import {PagePadding}     from "../../containers/PagePadding";
import {ChevronRight}    from "react-feather";
import useLoadEffect     from "../../hooks/useLoadEffect";


export const CartAddress: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const history = useHistory();
    const addresses = useAddresses();

    const loading = useLoadEffect(async () => {
        await dispatch.addresses.index();
    }, []);

    return <PagePadding>
        <Title>Selecione o endereço da entrega</Title>

        <div className="my-8">
            <AddressList
                loading={loading}
                addresses={Object.values(addresses.addresses)}
                contextIcon={ChevronRight}
                onClick={(address) => {
                    dispatch.cart.setAddress(address.id);
                    history.push('/carrinho')
                }}
            />
        </div>
    </PagePadding>
};
