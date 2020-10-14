import React, {useEffect}                                from "react";
import {useDispatch}                                     from "react-redux";
import {Dispatch}                                        from "../../store";
import {useHistory, useRouteMatch}                       from "react-router-dom";
import {Title}                                           from "../../components/Title";
import {Box}                                             from "../../components/Box";
import {CheckSquare, ChevronRight, Loader, Plus, Square} from "react-feather";
import {useAddresses}                                    from "../../selectors";
import {Loading}                                         from "../../components/Loading";

export const AddressesCreate: React.FC = ({children}) => {
    const dispatch = useDispatch<Dispatch>();

    useEffect(() => {
        dispatch.addresses.index();
    }, []);

    return <>
        <Title>Selecione o seu endereço</Title>

        s
    </>
};
