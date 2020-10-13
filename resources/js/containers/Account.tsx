import React         from "react";
import {useDispatch} from "react-redux";
import {Dispatch}    from "../store";

export const Account: React.FC = ({children}) => {
    const dispatch = useDispatch<Dispatch>();

    function logout() {
        dispatch.auth.logout();
    }

    return <>
        <button onClick={logout}>Logout</button>
    </>
};
