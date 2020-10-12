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
                <ProtectedRoute exact path="/">
                    <Menu>
                        <h1>Hello</h1>
                    </Menu>
                </ProtectedRoute>
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
