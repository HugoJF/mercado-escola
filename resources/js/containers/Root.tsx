import {Route, Switch, useLocation}      from "react-router-dom";
import {Login}                           from "../components/Login";
import {Overlay}                         from "./Overlay";
import {ProtectedRoute}                  from "./ProtectedRoute";
import {Home}                            from "./Home";
import React, {useEffect}                from "react";
import {CSSTransition, TransitionGroup,} from 'react-transition-group';
import {Account}                         from "./Account";
import {useDispatch}                     from "react-redux";
import {Dispatch}                        from "../store";
import {Register}                        from "../components/Register";
import {Container}                       from "./Container";

export const Root: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const location = useLocation();

    useEffect(() => {
        dispatch.auth.me();
    }, []);

    return <Overlay>
        <TransitionGroup className="relative">
            <CSSTransition
                key={location.key}
                classNames="alert"
                timeout={300}
            >
                <Container>
                    <Switch location={location}>
                        <Route path="/login">
                            <Login/>
                        </Route>
                        <Route path="/register">
                            <Register/>
                        </Route>

                        <ProtectedRoute exact path="/">
                            <Home/>
                        </ProtectedRoute>
                        <ProtectedRoute exact path="/pedidos">
                            <h1>Pedidos</h1>
                        </ProtectedRoute>
                        <ProtectedRoute exact path="/favoritos">
                            <h1>Favoritos</h1>
                        </ProtectedRoute>
                        <ProtectedRoute path="/conta">
                            <Account/>
                        </ProtectedRoute>
                    </Switch>
                </Container>
            </CSSTransition>
        </TransitionGroup>
    </Overlay>
};
