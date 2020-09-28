require('./bootstrap');
import React         from "react";
import ReactDOM      from "react-dom";
import Count         from "./Count";
import {Provider}    from "react-redux";
import {store}       from "./store";
import {AxiosStatic} from "axios";
import {Logged}      from "./containers/Logged";

declare global {
    const axios: AxiosStatic;
}

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Logged>
                <Count/>
            </Logged>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// @ts-ignore
if (module.hot && process.env.NODE_ENV === 'development') {
    // @ts-ignore
    module.hot.accept();
}
