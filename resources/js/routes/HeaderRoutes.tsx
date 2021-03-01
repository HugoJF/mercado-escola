import React                    from 'react';
import {Route, Switch}          from "react-router";
import {HomeHeader}             from "../headers/HomeHeader";
import {DefaultHeader}          from "../headers/DefaultHeader";
import {ProductHeaderContainer} from "../headers/ProductHeaderContainer";

export const HeaderRoutes: React.FC = () => {
    return <Switch>
        <Route exact path="/home" children={<HomeHeader/>}/>

        <Route path="/produtos/:productId" children={<ProductHeaderContainer/>}/>
        <Route children={<DefaultHeader/>}/>
    </Switch>
};
