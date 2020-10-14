import React, {ReactElement} from "react";
import {Login}               from "../pages/auth/Login";
import useIsAuthed           from "../hooks/useIsAuthed";

export const Logged: React.FC = ({children}) => {
    const logged = useIsAuthed();

    return logged ? (children as ReactElement) : <Login/>
};
