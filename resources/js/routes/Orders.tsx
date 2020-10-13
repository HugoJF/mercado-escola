import React           from 'react';
import {Route}         from "react-router";
import useRelativePath from "../hooks/useRelativePath";
import {OrdersSummary} from "../pages/orders/OrdersSummary";
import {OrdersShow}    from "../pages/orders/OrdersShow";

export const Orders: React.FC = () => {
    const relative = useRelativePath();

    return <>
        <Route exact path={relative('/')}>
            <OrdersSummary/>
        </Route>
        <Route path={relative('/:orderId')}>
            <OrdersShow/>
        </Route>
    </>
};
