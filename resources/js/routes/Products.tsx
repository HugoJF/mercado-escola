import React                   from 'react';
import {Route}                 from "react-router";
import useRelativePath         from "../hooks/useRelativePath";
import {ProductShow}           from "../pages/products/ProductShow";
import {SwitchWithTransitions} from "../components/SwitchWithTransition";
import {ProductIndex}          from "../pages/products/ProductIndex";

export const Products: React.FC = () => {
    const relative = useRelativePath();

    return <SwitchWithTransitions padding>
        <Route exact path={relative('/')} children={<ProductIndex/>}/>
        <Route path={relative('/:productId')} children={<ProductShow/>}/>
    </SwitchWithTransitions>
};
