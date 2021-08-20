import React from 'react';
import {Route} from "react-router";
import useRelativePath from "../hooks/useRelativePath";
import {SwitchWithTransitions} from "@components/ui/SwitchWithTransition";
import {ProductIndex} from "~/pages/products/ProductIndex";
import {ProductShowContainer} from "~/pages/products/ProductShowContainer";

export const ProductsRoutes: React.FC = () => {
    const relative = useRelativePath();

    return <SwitchWithTransitions>
        <Route exact path={relative('/')} children={<ProductIndex/>}/>
        <Route path={relative('/:productId')} children={<ProductShowContainer/>}/>
    </SwitchWithTransitions>
};
