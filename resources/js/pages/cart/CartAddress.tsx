import React, {useState}           from "react";
import {useHistory, useRouteMatch} from "react-router-dom";
import {Title}                     from "../../components/ui/Title";
import {useAddresses}              from "../../selectors";
import {useDispatch}               from "react-redux";
import {Dispatch}                  from "../../store";
import {AddressList}               from "../../components/address/AddressList";
import useAsyncEffect              from "../../hooks/useAsyncEffect";
import {PagePadding}               from "../../containers/PagePadding";


export const CartAddress: React.FC = ({children}) => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch<Dispatch>();
    const history = useHistory();
    const addresses = useAddresses();

    useAsyncEffect(async () => {
        await dispatch.addresses.index();
        setLoading(false);
    }, []);

    return <PagePadding>
        <Title>Selecione o endereço da entrega</Title>

        <div className="my-8">
            <AddressList
                loading={loading}
                addresses={Object.values(addresses.addresses)}
                onClick={(address) => {
                    dispatch.cart.setAddress(address.id);
                    history.push('/carrinho')
                }}
            />
        </div>
    </PagePadding>
};
