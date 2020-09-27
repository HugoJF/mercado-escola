require('./bootstrap');
import React         from "react";
import ReactDOM      from "react-dom";
import Count         from "./Count";
import {Provider}    from "react-redux";
import {store}       from "./store";
import {AxiosStatic} from "axios";

declare global {
    const axios: AxiosStatic;
}

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Count/>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
