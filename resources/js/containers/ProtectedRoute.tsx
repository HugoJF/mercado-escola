import React             from "react";
import useIsAuthed       from "../hooks/useIsAuthed";
import {Redirect, Route} from "react-router-dom";
import {RouteProps}      from "react-router";

export const ProtectedRoute: React.FC<RouteProps> = ({children, ...rest}) => {
    const logged = useIsAuthed();

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
