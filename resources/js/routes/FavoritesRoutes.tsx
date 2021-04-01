import React from 'react';
import {Route} from "react-router";
import useRelativePath from "../hooks/useRelativePath";
import {SwitchWithTransitions} from "../components/ui/SwitchWithTransition";
import {FavoritesIndexContainer} from "../pages/favorites/FavoritesIndexContainer";

export const FavoritesRoutes: React.FC = () => {
    const relative = useRelativePath();

    return <SwitchWithTransitions>
        <Route exact path={relative('/')} children={<FavoritesIndexContainer/>}/>
    </SwitchWithTransitions>
};
