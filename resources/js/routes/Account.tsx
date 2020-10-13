import React            from 'react';
import {Route}          from "react-router";
import useRelativePath  from "../hooks/useRelativePath";
import {AccountSummary} from "../pages/account/AccountSummary";
import {Link}           from "react-router-dom";

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
        <Route path={relative('/endereco')}>
            <Link to={relative('')}>Back2</Link>
        </Route>
        <Route path={relative('/telefone')}>
            <Link to={relative('')}>Back2</Link>
        </Route>
    </>
};
