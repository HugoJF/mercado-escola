import React                   from 'react';
import {Route}                 from "react-router";
import useRelativePath         from "../hooks/useRelativePath";
import {AccountSummary}        from "../pages/account/AccountSummary";
import {AddressesIndex}        from "../pages/account/AddressesIndex";
import {AddressesCreate}       from "../pages/account/AddressesCreate";
import {SwitchWithTransitions} from "../components/ui/SwitchWithTransition";
import {PhoneUpdate}           from "../pages/account/PhoneUpdate";
import {Logout}                from "../pages/account/Logout";

export const AccountRoutes: React.FC = () => {
    const relative = useRelativePath();

    return <SwitchWithTransitions padding>
        <Route exact path={relative('/')} children={<AccountSummary/>}/>
        <Route exact path={relative('/endereco/novo')} children={<AddressesCreate/>}/>
        <Route exact path={relative('/endereco')} children={<AddressesIndex/>}/>
        <Route exact path={relative('/sair')} children={<Logout/>} />
        <Route path={relative('/telefone')} children={<PhoneUpdate/>}/>
    </SwitchWithTransitions>
};