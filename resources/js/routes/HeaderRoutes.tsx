import React                    from 'react';
import {Route, Switch}          from "react-router";
import {HomeHeader}             from "../headers/HomeHeader";
import {DefaultHeader}          from "../headers/DefaultHeader";
import {ProductHeaderContainer} from "../headers/ProductHeaderContainer";
import {DefaultHeaderWithCart}  from "../headers/DefaultHeaderWithCart";

export const HeaderRoutes: React.FC = () => {
    return <Switch>
        <Route exact path="/home" children={<HomeHeader/>}/>
        <Route path="/produtos/:productId" children={<ProductHeaderContainer/>}/>

        <Route path="/login" children={null}/>
        <Route path="/register" children={null}/>
        <Route path="/carrinho" children={<DefaultHeader/>}/>
        <Route path="/conta" children={<DefaultHeader/>}/>
        <Route path="/admin" children={<DefaultHeader/>}/>

        <Route children={<DefaultHeaderWithCart/>}/>
    </Switch>
};
