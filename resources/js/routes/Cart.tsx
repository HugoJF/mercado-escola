import React                   from 'react';
import {Route}                 from "react-router";
import useRelativePath         from "../hooks/useRelativePath";
import {HomePage}              from "../pages/home/HomePage";
import {SwitchWithTransitions} from "../components/SwitchWithTransition";
import {CartIndex}             from "../pages/cart/CartIndex";

export const Cart: React.FC = () => {
    const relative = useRelativePath();

    return <SwitchWithTransitions padding>
        <Route exact path={relative('/')} children={<CartIndex/>}/>
    </SwitchWithTransitions>
};
