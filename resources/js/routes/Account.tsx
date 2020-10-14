import React             from 'react';
import {Route}           from "react-router";
import useRelativePath   from "../hooks/useRelativePath";
import {AccountSummary}  from "../pages/account/AccountSummary";
import {Link}            from "react-router-dom";
import {AddressesIndex}  from "../pages/account/AddressesIndex";
import {AddressesCreate} from "../pages/account/AddressesCreate";

export const Account: React.FC = () => {
    const relative = useRelativePath();

    return <>
        <Route exact path={relative('/')}>
            <AccountSummary/>
        </Route>
        <Route path={relative('/nome')}>
            <Link to={relative('')}>Back2</Link>
        </Route>
        <Route path={relative('/email')}>
            <Link to={relative('')}>Back2</Link>
        </Route>
        <Route exact path={relative('/endereco/novo')} children={<AddressesCreate/>}/>
        <Route exact path={relative('/endereco')} children={<AddressesIndex/>}/>
        <Route path={relative('/telefone')}>
            <Link to={relative('')}>Back2</Link>
        </Route>
    </>
};
