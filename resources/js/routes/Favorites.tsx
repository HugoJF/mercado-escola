import React                   from 'react';
import {Route}                 from "react-router";
import useRelativePath         from "../hooks/useRelativePath";
import {AccountSummary}        from "../pages/account/AccountSummary";
import {ProductShow}           from "../pages/products/ProductShow";
import {SwitchWithTransitions} from "../components/SwitchWithTransition";
import {FavoritesIndex}        from "../pages/favorites/FavoritesIndex";

export const Favorites: React.FC = () => {
    const relative = useRelativePath();

    return <SwitchWithTransitions>
        <Route exact path={relative('/')} children={<FavoritesIndex/>}/>
    </SwitchWithTransitions>
};
