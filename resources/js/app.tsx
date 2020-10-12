import "./bootstrap";
import React                            from "react";
import ReactDOM                         from "react-dom";
import {Provider}                       from "react-redux";
import {store}                          from "./store";
import {Menu}                           from "./components/Menu";
import {Login}                          from "./components/Login";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {ProtectedRoute}                 from "./containers/ProtectedRoute";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <Menu>
                    <ProtectedRoute exact path="/">
                        <h1>Hello</h1>
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
                </Menu>

                <Route path="/login">
                    <Login/>
                </Route>
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
