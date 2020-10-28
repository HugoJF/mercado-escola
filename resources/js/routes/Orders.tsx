import React                   from 'react';
import {Route, useLocation}    from "react-router";
import useRelativePath         from "../hooks/useRelativePath";
import {OrdersEnd}             from "../pages/orders/OrdersEnd";
import {SwitchWithTransitions} from "../components/ui/SwitchWithTransition";
import {OrdersIndex}           from "../pages/orders/OrdersIndex";

export const Orders: React.FC = () => {
    const relative = useRelativePath();

    return <SwitchWithTransitions padding>
        <Route exact path={relative('/')} children={<OrdersIndex/>}/>
        <Route path={relative('/:orderId')} children={<OrdersEnd/>}/>
    </SwitchWithTransitions>
};
