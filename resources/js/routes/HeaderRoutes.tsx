import React           from 'react';
import {Route, Switch} from "react-router";
import {HomeHeader}    from "../headers/HomeHeader";
import {DefaultHeader} from "../headers/DefaultHeader";
import {ProductHeaderContainer} from "../headers/ProductHeaderContainer";

export const HeaderRoutes: React.FC = () => {
    return <Switch>
        <Route exact path="/home" children={<HomeHeader/>}/>
        <Route path="/login" children={null}/>
        <Route path="/register" children={null}/>
        <Route path="/on-boarding" children={null}/>

        <Route path="/conta" children={null}/>
        <Route path="/admin" children={null}/>
        <Route path="/pedidos" children={null}/>

        <Route path="/produtos/:productId" children={<ProductHeaderContainer/>}/>
        <Route children={<DefaultHeader/>}/>
    </Switch>
};
