import React from 'react';
import {Route} from "react-router";
import useRelativePath from "../hooks/useRelativePath";
import {SwitchWithTransitions} from "../components/ui/SwitchWithTransition";
import {OrdersShowContainer} from "../pages/orders/OrdersShowContainer";
import {OrderDoneContainer} from "../pages/orders/OrderDoneContainer";
import {OrdersIndexContainer} from "../pages/orders/OrdersIndexContainer";

export const OrdersRoutes: React.FC = () => {
    const relative = useRelativePath();

    return <SwitchWithTransitions>
        <Route exact path={relative('/')} children={<OrdersIndexContainer/>}/>
        <Route path={relative('/:orderId/finalizado')} children={<OrderDoneContainer/>}/>
        <Route path={relative('/:orderId')} children={<OrdersShowContainer/>}/>
    </SwitchWithTransitions>
};
