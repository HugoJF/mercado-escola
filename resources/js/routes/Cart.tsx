import React                   from 'react';
import {Route}                 from "react-router";
import useRelativePath         from "../hooks/useRelativePath";
import {HomePage}              from "../pages/home/HomePage";
import {SwitchWithTransitions} from "../components/SwitchWithTransition";
import {CartIndex}             from "../pages/cart/CartIndex";
import {CartAddress}           from "../pages/cart/CartAddress";

export const Cart: React.FC = () => {
    const relative = useRelativePath();

    return <SwitchWithTransitions padding>
        <Route exact path={relative('/')} children={<CartIndex/>}/>
        <Route exact path={relative('/endereco')} children={<CartAddress/>}/>
    </SwitchWithTransitions>
};
