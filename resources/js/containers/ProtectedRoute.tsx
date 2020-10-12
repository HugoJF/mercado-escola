import React, {useEffect} from "react";
import useIsAuthed        from "../hooks/useIsAuthed";
import {Redirect, Route}  from "react-router-dom";
import {useDispatch}      from "react-redux";
import {Dispatch}         from "../store";
import {RouteProps}       from "react-router";

export const ProtectedRoute: React.FC<RouteProps> = ({children, ...rest}) => {
    const logged = useIsAuthed();
    const dispatch = useDispatch<Dispatch>();

    // TODO: move to a dedicated "unique" component
    useEffect(() => {
        dispatch.auth.me();
    }, []);

    return (
        <Route
            {...rest}
            render={({location}) =>
                logged ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
};
