import React           from 'react';
import {Route, Switch} from "react-router";
import {HomeHeader}    from "./HomeHeader";
import {DefaultHeader} from "./DefaultHeader";
import {ProductHeader} from "./ProductHeader";

export const Header: React.FC = () => {
    return <Switch>
        <Route exact path="/home" children={<HomeHeader/>}/>
        <Route path="/login" children={null}/>
        <Route path="/produtos/:productId" children={<ProductHeader/>}/>
        <Route children={<DefaultHeader/>}/>
    </Switch>
};
