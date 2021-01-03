import React                               from "react";
import {Book, Heart, Home, Settings, User} from "react-feather";
import {Route, Switch}                     from "react-router";
import {Menu}                              from "../Menu";

const buttons = {
    Home: {
        to: '/home',
        icon: Home,
        adminOnly: false,
    },
    Favoritos: {
        to: '/favoritos',
        icon: Heart,
        adminOnly: false,
    },
    Pedidos: {
        to: '/pedidos',
        icon: Book,
        adminOnly: false,
    },
    Admin: {
        to: '/admin',
        icon: Settings,
        adminOnly: true,
    },
    Conta: {
        to: '/conta',
        icon: User,
        adminOnly: false,
    },
};

export const MenuRoutes: React.FC = () => {
    return <Switch>
        <Route path="/login" children={null}/>
        <Route path="/register" children={null}/>
        <Route path="/on-boarding" children={null}/>
        <Route children={<Menu/>}/>
    </Switch>
};
