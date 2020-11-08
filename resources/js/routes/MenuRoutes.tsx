import React                               from "react";
import Ripples                             from "react-ripples";
import {useHistory, useLocation}           from "react-router-dom";
import {Book, Heart, Home, Settings, User} from "react-feather";
import {useAuth}                           from "../selectors";
import classNames                          from 'classnames';
import {Route, Switch}                     from "react-router";
import {HomeHeader}                        from "../headers/HomeHeader";
import {ProductHeader}                     from "../headers/ProductHeader";
import {DefaultHeader}                     from "../headers/DefaultHeader";
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
        <Route children={<Menu/>}/>
    </Switch>
};
