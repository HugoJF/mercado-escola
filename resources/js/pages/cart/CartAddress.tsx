import React, {useEffect, useState}      from "react";
import {Link, useHistory, useRouteMatch} from "react-router-dom";
import {Button}                          from "../../components/ui/Button";
import {Title}                           from "../../components/ui/Title";
import {Calendar, Edit, MapPin, XSquare} from "react-feather";
import {useAddresses, useCart, useProducts} from "../../selectors";
import {useDispatch}                        from "react-redux";
import {Dispatch}                           from "../../store";
import {ProductType}    from "../../models/products";
import {PriceFormatter} from "../../components/ui/PriceFormatter";
import {addresses}    from "../../models/addresses";
import {AddressList}  from "../../components/address/AddressList";
import useAsyncEffect from "../../hooks/useAsyncEffect";


export const CartAddress: React.FC = ({children}) => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch<Dispatch>();
    const history = useHistory();
    const match = useRouteMatch();
    const addresses = useAddresses();

    useAsyncEffect(async () => {
        await dispatch.addresses.index();
        setLoading(false);
    }, []);

    return <>
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
    </>
};
