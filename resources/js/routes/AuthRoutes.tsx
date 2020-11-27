import React                   from 'react';
import {Route, useLocation}    from "react-router";
import useRelativePath         from "../hooks/useRelativePath";
import {SwitchWithTransitions} from "../components/ui/SwitchWithTransition";
import {OrdersIndex}           from "../pages/orders/OrdersIndex";
import {OrdersShow}            from "../pages/orders/OrdersShow";
import {OrderDoneContainer}    from "../pages/orders/OrderDoneContainer";
import {Login}                 from "../pages/auth/Login";
import {Register}              from "../pages/auth/Register";

export const AuthRoutes: React.FC = () => {
    return <SwitchWithTransitions padding>
        <Route path="/login" children={<Login/>}/>
        <Route path="/register" children={<Register/>}/>
    </SwitchWithTransitions>
};
