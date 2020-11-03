import React                   from 'react';
import {Route, useLocation}    from "react-router";
import useRelativePath         from "../hooks/useRelativePath";
import {SwitchWithTransitions} from "../components/ui/SwitchWithTransition";
import {OrdersIndex}           from "../pages/orders/OrdersIndex";
import {OrdersDone}            from "../pages/orders/OrdersDone";
import {OrdersShow}            from "../pages/orders/OrdersShow";

export const Orders: React.FC = () => {
    const relative = useRelativePath();

    return <SwitchWithTransitions padding>
        <Route exact path={relative('/')} children={<OrdersIndex/>}/>
        <Route path={relative('/:orderId/finalizado')} children={<OrdersDone/>}/>
        <Route path={relative('/:orderId')} children={<OrdersShow/>}/>
    </SwitchWithTransitions>
};
