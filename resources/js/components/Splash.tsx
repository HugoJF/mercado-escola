import React, {useEffect, useState}     from "react";
import {Loader}                         from "react-feather";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {useDispatch}                    from "react-redux";
import useAsyncEffect                   from "../hooks/useAsyncEffect";

export const Splash: React.FC = ({children}) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useAsyncEffect(async () => {
        await dispatch.auth.me();
        setLoading(false);
    }, []);

    return <TransitionGroup className="relative min-h-full">
        <CSSTransition
            key={String(loading)}
            classNames="fade"
            timeout={1000}
        >
            {loading ?
                <div className="w-full min-h-screen flex flex-col items-center justify-center bg-primary-500 justify-center">
                    <h1 className="mb-8 text-5xl text-white font-bold">DiCasa</h1>
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
