import React                   from 'react';
import {Route}                 from "react-router";
import useRelativePath         from "../hooks/useRelativePath";
import {AccountSummary}        from "../pages/account/AccountSummary";
import {Link}                  from "react-router-dom";
import {AddressesIndex}        from "../pages/account/AddressesIndex";
import {AddressesCreate}       from "../pages/account/AddressesCreate";
import {SwitchWithTransitions} from "../components/SwitchWithTransition";

export const Account: React.FC = () => {
    const relative = useRelativePath();

    return <SwitchWithTransitions>
        <Route exact path={relative('/')} children={<AccountSummary/>}/>
        <Route path={relative('/nome')} children={<Link to={relative('')}>Back2</Link>}/>
        <Route path={relative('/email')} children={<Link to={relative('')}>Back2</Link>}/>
        <Route exact path={relative('/endereco/novo')} children={<AddressesCreate/>}/>
        <Route exact path={relative('/endereco')} children={<AddressesIndex/>}/>
        <Route path={relative('/telefone')} children={<Link to={relative('')}>Back2</Link>}/>
    </SwitchWithTransitions>
};
