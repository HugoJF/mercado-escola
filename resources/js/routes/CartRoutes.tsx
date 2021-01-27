import React                   from 'react';
import {Route}                 from "react-router";
import useRelativePath         from "../hooks/useRelativePath";
import {SwitchWithTransitions} from "../components/ui/SwitchWithTransition";
import {CartIndex}             from "../pages/cart/CartIndex";
import {CartAddress}           from "../pages/cart/CartAddress";
import {CartIndexContainer}    from "../pages/cart/CartIndexContainer";

export const CartRoutes: React.FC = () => {
    const relative = useRelativePath();

    return <SwitchWithTransitions>
        <Route exact path={relative('/')} children={<CartIndexContainer/>}/>
        <Route exact path={relative('/endereco')} children={<CartAddress/>}/>
    </SwitchWithTransitions>
};
