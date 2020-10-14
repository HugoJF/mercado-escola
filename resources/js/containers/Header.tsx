import React           from 'react';
import {Route, Switch} from "react-router";
import {HomeHeader}    from "../headers/HomeHeader";
import {DefaultHeader} from "../headers/DefaultHeader";
import {ProductHeader} from "../headers/ProductHeader";

export const Header: React.FC = () => {
    return <Switch>
        <Route exact path="/" children={<HomeHeader/>}/>
        <Route path="/produtos/:productId" children={<ProductHeader/>}/>
        <Route children={<DefaultHeader/>}/>
    </Switch>
};
