import "./bootstrap";
import React                     from "react";
import ReactDOM                  from "react-dom";
import {store}                   from "./store";
import {BrowserRouter as Router} from "react-router-dom";
import {Provider}                from "react-redux";
import {hot, setConfig}          from "react-hot-loader";
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils              from '@date-io/date-fns';
import {ptBR}                    from "date-fns/locale";
import {RootRoutes}              from "./routes/RootRoutes";

setConfig({reloadHooks: false});

const WrappedRoot = hot(module)(RootRoutes);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
                    <WrappedRoot/>
                </MuiPickersUtilsProvider>
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

