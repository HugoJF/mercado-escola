import React                   from 'react';
import {Redirect}              from "react-router";
import useRelativePath         from "../hooks/useRelativePath";
import {SwitchWithTransitions} from "../components/ui/SwitchWithTransition";
import {ProtectedRoute}        from "../containers/ProtectedRoute";
import {OnBoarding1}           from "../pages/on-boarding/OnBoarding1";
import {OnBoarding2}           from "../pages/on-boarding/OnBoarding2";

export const OnBoardingRoutes: React.FC = () => {
    const relative = useRelativePath();

    return <SwitchWithTransitions>
        <ProtectedRoute exact path={relative('/1')} children={<OnBoarding1/>}/>
        <ProtectedRoute exact path={relative('/2')} children={<OnBoarding2/>}/>

        <Redirect to={relative('/1')}/>
    </SwitchWithTransitions>
};
