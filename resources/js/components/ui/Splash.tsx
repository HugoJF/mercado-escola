import React, {useEffect, useState} from "react";
import {Loader} from "react-feather";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {useDispatch} from "react-redux";
import useAsyncEffect from "@hooks/useAsyncEffect";
import {load} from "~/google";

export const Splash: React.FC = ({children}) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useAsyncEffect(async () => {
        await Promise.all([
            dispatch.auth.me(),
            load(),
        ]);
        setLoading(false);
    }, []);

    useEffect(window.updateViewportProperty());

    return <TransitionGroup className="h-full">
        <CSSTransition
            key={String(loading)}
            classNames="fade"
            timeout={1000}
        >
            {loading ?
                <div
                    className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary-500 to-primary-700 justify-center">
                    <h1 className="mb-8 text-center text-5xl text-white font-bold leading-none tracking-tight">
                        Mercado Escola
                    </h1>
                    <Loader size={48} className="text-white animate-spin"/>
                </div>
                :
                <>
                    {children}
                </>
            }
        </CSSTransition>
    </TransitionGroup>

};
