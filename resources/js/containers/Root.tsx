import {Route, Switch, useLocation}      from "react-router-dom";
import {Login}                           from "../components/Login";
import {Overlay}                         from "./Overlay";
import {ProtectedRoute}                  from "./ProtectedRoute";
import React, {useEffect}                from "react";
import {CSSTransition, TransitionGroup,} from 'react-transition-group';
import {useDispatch}                     from "react-redux";
import {Dispatch}                        from "../store";
import {Register}                        from "../components/Register";
import {Container}                       from "./Container";
import {Account}                         from "../routes/Account";
import {Home}                            from "../routes/Home";
import {Orders}                          from "../routes/Orders";

export const Root: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const location = useLocation();

    useEffect(() => {
        dispatch.auth.me();
    }, []);

    return <Overlay>
        <TransitionGroup className="relative min-h-full">
            <CSSTransition
                key={location.key}
                classNames="alert"
                timeout={500}
            >
                <Container>
                    <Switch location={location}>
                        <Route path="/login">
                            <Login/>
                        </Route>
                        <Route path="/register">
                            <Register/>
                        </Route>

                        <ProtectedRoute exact path="/" children={<Home/>}/>
                        <ProtectedRoute path="/pedidos" children={<Orders/>}/>
                        <ProtectedRoute exact path="/favoritos">
                            <h1>Favoritoss</h1>
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
