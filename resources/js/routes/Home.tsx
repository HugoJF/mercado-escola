import React                   from 'react';
import {Route}                 from "react-router";
import useRelativePath         from "../hooks/useRelativePath";
import {HomePage}              from "../pages/home/HomePage";
import {SwitchWithTransitions} from "../components/SwitchWithTransition";

export const Home: React.FC = () => {
    const relative = useRelativePath();

    return <SwitchWithTransitions>
        <Route exact path={relative('/')} children={<HomePage/>}/>
    </SwitchWithTransitions>
};
