import React                   from 'react';
import {Route}                 from "react-router";
import useRelativePath         from "../hooks/useRelativePath";
import {SwitchWithTransitions} from "../components/ui/SwitchWithTransition";
import {FavoritesIndex}        from "../pages/favorites/FavoritesIndex";

export const Favorites: React.FC = () => {
    const relative = useRelativePath();

    return <SwitchWithTransitions padding>
        <Route exact path={relative('/')} children={<FavoritesIndex/>}/>
    </SwitchWithTransitions>
};
