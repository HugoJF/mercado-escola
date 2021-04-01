import React from 'react';
import {Toast} from "./Toast";
import {useToasts} from "../../selectors";
import {CSSTransition, TransitionGroup} from "react-transition-group";

export const ToastsContainer = () => {
    const toasts = useToasts();

    return <TransitionGroup className="flex flex-col items-center justify-center fixed w-full px-8 top-0 z-50">
        {Object
            .entries(toasts)
            .filter((value, index) => index < 2)
            .map(([id, toast]) => <CSSTransition
                    key={id}
                    classNames="slide"
                    timeout={500}
                >
                    <Toast
                        id={id}
                        toast={toast}
                    />
                </CSSTransition>
            )}
    </TransitionGroup>
};
