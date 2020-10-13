import React            from 'react';
import {Route}          from "react-router";
import useRelativePath  from "../hooks/useRelativePath";
import {AccountSummary} from "../pages/account/AccountSummary";
import {Link}           from "react-router-dom";
import {ProductShow}    from "../pages/products/ProductShow";

export const Products: React.FC = () => {
    const relative = useRelativePath();

    return <>
        <Route exact path={relative('/')}>
            <AccountSummary/>
        </Route>
        <Route path={relative('/:productId')} children={<ProductShow/>}/>
    </>
};
