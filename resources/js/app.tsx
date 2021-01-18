import "./bootstrap";
import React                     from "react";
import ReactDOM                  from "react-dom";
import * as Sentry               from "@sentry/react";
import {store}                   from "./store";
import {BrowserRouter as Router} from "react-router-dom";
import {Integrations}            from "@sentry/tracing";
import {Provider}                from "react-redux";
import {hot, setConfig}          from "react-hot-loader";
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils              from '@date-io/date-fns';
import {ptBR}                    from "date-fns/locale";
import {RootRoutes}              from "./routes/RootRoutes";

Sentry.init({
    dsn: process.env.MIX_SENTRY_DSN,
    autoSessionTracking: true,
    integrations: [
        new Integrations.BrowserTracing(),
    ],
    environment: process.env.MIX_APP_ENV,
    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
});

setConfig({reloadHooks: false});

const WrappedRoot = hot(module)(RootRoutes);

ReactDOM.render(
    <React.StrictMode>
        <Sentry.ErrorBoundary fallback={"An error has occurred"}>
            <Provider store={store}>
                <Router>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
                        <WrappedRoot/>
                    </MuiPickersUtilsProvider>
                </Router>
            </Provider>
        </Sentry.ErrorBoundary>
    </React.StrictMode>,
    document.getElementById("root")
);

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('service-worker.js')
        .then(() => console.log('Service Worker: Registered'))
        .catch((e) => console.log('Service Worker: Failed to register', e));
} else {
    console.warn('Service work is not available')
}
