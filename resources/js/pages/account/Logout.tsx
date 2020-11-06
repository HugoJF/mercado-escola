import React, {useEffect} from "react";
import {useDispatch}      from "react-redux";
import {Dispatch}         from "../../store";
import {Loading}          from "../../components/ui/Loading";

export const Logout: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();

    useEffect(() => {
        dispatch.auth.logout();
    }, []);

    return <>
        <Loading loading={true}/>
    </>
};
