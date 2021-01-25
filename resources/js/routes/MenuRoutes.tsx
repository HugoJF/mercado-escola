import React           from "react";
import {Route, Switch} from "react-router";
import {Menu}          from "../Menu";

export const MenuRoutes: React.FC = () => {
    return <Switch>
        <Route path="/login" children={null}/>
        <Route path="/register" children={null}/>
        <Route path="/on-boarding" children={null}/>
        <Route children={<Menu/>}/>
    </Switch>
};
