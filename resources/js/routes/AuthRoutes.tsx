import React from 'react';
import {Route} from "react-router";
import {SwitchWithTransitions} from "../components/ui/SwitchWithTransition";
import {Login} from "../pages/auth/Login";
import {Register} from "../pages/auth/Register";

export const AuthRoutes: React.FC = () => {
    return <SwitchWithTransitions>
        <Route path="/login" children={<Login/>}/>
        <Route path="/register" children={<Register/>}/>
    </SwitchWithTransitions>
};
