import React, {ReactElement, useEffect} from "react";
import {useDispatch}                    from "react-redux";
import {Dispatch}                       from "../store";
import {Login}     from "../components/Login";
import useIsAuthed from "../hooks/useIsAuthed";

export const Logged: React.FC = ({children}) => {
    const logged = useIsAuthed();

    return logged ? (children as ReactElement) : <Login/>
};
