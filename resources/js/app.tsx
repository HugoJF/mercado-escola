import "./bootstrap";
import React                                    from "react";
import ReactDOM                                 from "react-dom";
import {Provider}                               from "react-redux";
import {store}                                  from "./store";
import {Overlay}                                from "./containers/Overlay";
import {Login}                                  from "./components/Login";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {ProtectedRoute}                         from "./containers/ProtectedRoute";
import {Home}                                   from "./containers/Home";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route path="/login">
                        <Login/>
                    </Route>

                    <Overlay>
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
                            <h1>Conta</h1>
                        </ProtectedRoute>
                    </Overlay>
                </Switch>
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// @ts-ignore
if (module.hot && process.env.NODE_ENV === 'development') {
    // @ts-ignore
    module.hot.accept();
}
