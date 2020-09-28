import React, {ReactElement, useEffect} from "react";
import {useDispatch, useSelector}       from "react-redux";
import {Dispatch, RootState}            from "../store";
import {Login}                          from "../components/Login";
import {useAuth}                        from "../selectors";

export const Logged: React.FC<object> = ({children}) => {
    const dispatch = useDispatch<Dispatch>();
    const auth = useAuth();
    const logged = auth.me?.email;

    useEffect(() => {
        dispatch.auth.me();
    }, []);

    return logged ? (children as ReactElement) : <Login/>
};
