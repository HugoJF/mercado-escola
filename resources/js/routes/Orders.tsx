import React                   from 'react';
import {Route, useLocation}    from "react-router";
import useRelativePath         from "../hooks/useRelativePath";
import {OrdersSummary}         from "../pages/orders/OrdersSummary";
import {OrdersShow}            from "../pages/orders/OrdersShow";
import {OrdersEnd}             from "../pages/orders/OrdersEnd";
import {SwitchWithTransitions} from "../components/SwitchWithTransition";

export const Orders: React.FC = () => {
    const relative = useRelativePath();
    const location = useLocation();

    return <SwitchWithTransitions>
        <Route exact path={relative('/')} children={<OrdersSummary/>}/>
        <Route exact path={relative('/carrinho')} children={<OrdersShow/>}/>
        <Route path={relative('/:orderId')} children={<OrdersEnd/>}/>
    </SwitchWithTransitions>
};
