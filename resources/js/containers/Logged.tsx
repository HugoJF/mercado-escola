import React, {ReactElement, useEffect} from "react";
import {useDispatch}                    from "react-redux";
import {Dispatch}                       from "../store";
import {Login}                          from "../components/Login";
import useIsAuthed                      from "../../hooks/useIsAuthed";

export const Logged: React.FC = ({children}) => {
    const dispatch = useDispatch<Dispatch>();
    const logged = useIsAuthed();

    // TODO: move to a dedicated "unique" component
    useEffect(() => {
        dispatch.auth.me();
    }, []);

    return logged ? (children as ReactElement) : <Login/>
};
