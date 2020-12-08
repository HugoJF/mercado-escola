import React                   from 'react';
import {Route, useLocation}    from "react-router";
import useRelativePath         from "../hooks/useRelativePath";
import {SwitchWithTransitions} from "../components/ui/SwitchWithTransition";
import {OrdersIndex}           from "../pages/orders/OrdersIndex";
import {OrdersShow}            from "../pages/orders/OrdersShow";
import {OrderDoneContainer}    from "../pages/orders/OrderDoneContainer";

export const OrdersRoutes: React.FC = () => {
    const relative = useRelativePath();

    return <SwitchWithTransitions>
        <Route exact path={relative('/')} children={<OrdersIndex/>}/>
        <Route path={relative('/:orderId/finalizado')} children={<OrderDoneContainer/>}/>
        <Route path={relative('/:orderId')} children={<OrdersShow/>}/>
    </SwitchWithTransitions>
};
