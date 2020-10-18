import React                   from 'react';
import {Route}                 from "react-router";
import useRelativePath         from "../hooks/useRelativePath";
import {AccountSummary}        from "../pages/account/AccountSummary";
import {ProductShow}           from "../pages/products/ProductShow";
import {SwitchWithTransitions} from "../components/SwitchWithTransition";

export const Products: React.FC = () => {
    const relative = useRelativePath();

    return <SwitchWithTransitions padding>
        <Route exact path={relative('/')} children={<AccountSummary/>}/>
        <Route path={relative('/:productId')} children={<ProductShow/>}/>
    </SwitchWithTransitions>
};
