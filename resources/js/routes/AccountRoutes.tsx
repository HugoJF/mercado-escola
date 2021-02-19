import React                     from 'react';
import {Route}                   from "react-router";
import useRelativePath           from "../hooks/useRelativePath";
import {AccountIndex}            from "../pages/account/AccountIndex";
import {AddressesCreate}         from "../pages/account/AddressesCreate";
import {SwitchWithTransitions}   from "../components/ui/SwitchWithTransition";
import {PhoneUpdate}             from "../pages/account/PhoneUpdate";
import {Logout}                  from "../pages/account/Logout";
import {AddressesIndexContainer} from "../pages/account/AddressesIndexContainer";

export const AccountRoutes: React.FC = () => {
    const relative = useRelativePath();

    return <SwitchWithTransitions>
        <Route exact path={relative('/')} children={<AccountIndex/>}/>
        <Route exact path={relative('/endereco/novo')} children={<AddressesCreate/>}/>
        <Route exact path={relative('/endereco')} children={<AddressesIndexContainer/>}/>
        <Route exact path={relative('/sair')} children={<Logout/>}/>
        <Route path={relative('/telefone')} children={<PhoneUpdate/>}/>
    </SwitchWithTransitions>
};
