import React           from 'react';
import {Route}         from "react-router";
import useRelativePath from "../hooks/useRelativePath";
import {HomePage}      from "../pages/home/HomePage";

export const Home: React.FC = () => {
    const relative = useRelativePath();

    return <>
        <Route exact path={relative('/')}>
            <HomePage/>
        </Route>
    </>
};
