import React          from "react";
import {Title}        from "../../components/ui/Title";
import {useAddresses} from "../../selectors";
import {useDispatch}  from "react-redux";
import {Dispatch}     from "../../store";
import {AddressList}  from "../../components/addresses/AddressList";
import {PagePadding}  from "../../containers/PagePadding";
import {ChevronRight} from "react-feather";
import useLoadEffect  from "../../hooks/useLoadEffect";
import useNavigation  from "../../hooks/useNavigation";


export const CartAddress: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const {go} = useNavigation();
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
                    go('/carrinho')
                }}
            />
        </div>
    </PagePadding>
};
