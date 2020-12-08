import React                   from 'react';
import {Route}                 from "react-router";
import useRelativePath         from "../hooks/useRelativePath";
import {ProductShow}           from "../pages/products/ProductShow";
import {SwitchWithTransitions} from "../components/ui/SwitchWithTransition";
import {ProductIndex}          from "../pages/products/ProductIndex";

export const ProductsRoutes: React.FC = () => {
    const relative = useRelativePath();

    return <SwitchWithTransitions>
        <Route exact path={relative('/')} children={<ProductIndex/>}/>
        <Route path={relative('/:productId')} children={<ProductShow/>}/>
    </SwitchWithTransitions>
};
