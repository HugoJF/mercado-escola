import "./bootstrap";
import React      from "react";
import ReactDOM   from "react-dom";
import {Provider} from "react-redux";
import {store}    from "./store";
import {Logged}   from "./containers/Logged";
import {Menu}     from "./components/Menu";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Logged>
                <Menu>
                    <h1>Hello</h1>
                </Menu>
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
