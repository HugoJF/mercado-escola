import "./bootstrap";
import React                     from "react";
import ReactDOM from "react-dom";
import {Root}   from "./routes/Root";
import {store}  from "./store";
import {BrowserRouter as Router} from "react-router-dom";
import {Provider}                from "react-redux";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <Root/>
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
