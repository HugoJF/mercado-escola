import React                   from 'react';
import {Route}                 from "react-router";
import useRelativePath         from "../hooks/useRelativePath";
import {HomePage}              from "../pages/home/HomePage";
import {SwitchWithTransitions} from "../components/ui/SwitchWithTransition";

export const HomeRoutes: React.FC = () => {
    const relative = useRelativePath();

    return <SwitchWithTransitions padding>
        <Route exact path={relative('/')} children={<HomePage/>}/>
    </SwitchWithTransitions>
};
