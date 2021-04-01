import React, {useEffect, useState} from "react";
import {WifiOff} from "react-feather";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {Container} from "../../containers/Container";

export const Online: React.FC = ({children}) => {
    const [online, setOnline] = useState(navigator?.onLine ?? true);

    useEffect(() => {
        function onOffline() {
            setOnline(false);
        }

        function onOnline() {
            setOnline(true);
        }

        window.addEventListener('online', onOnline);
        window.addEventListener('offline', onOffline);

        return () => {
            window.removeEventListener('online', onOnline);
            window.removeEventListener('offline', onOffline);
        }
    }, []);

    return <TransitionGroup className="relative h-full">
        <CSSTransition
            key={String(online)}
            classNames="fade"
            timeout={500}
        >
            <Container>
                {online ?
                    <>{children}</>
                    :
                    <div className="px-8 space-y-8 w-full min-h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary-500 to-primary-700 justify-center">
                        {/* Icon */}
                        <WifiOff size={48} className="text-white"/>

                        {/* Header */}
                        <h1 className=" text-center text-4xl text-white font-bold leading-none tracking-wide">
                            Você está offline!
                        </h1>

                        {/* Description */}
                        <p className="text-center text-primary-100 tracking-tighter">
                            Precisamos de conexão com a internet para funcionar. Por favor verifique sua conexão para
                            continuar!
                        </p>
                    </div>
                }
            </Container>
        </CSSTransition>
    </TransitionGroup>
};
