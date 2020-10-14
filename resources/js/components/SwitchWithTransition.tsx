import {CSSTransition, TransitionGroup} from "react-transition-group";
import {Container}                      from "../containers/Container";
import {Switch, useLocation}            from "react-router-dom";
import React                            from "react";



export const SwitchWithTransitions: React.FC = ({children}) => {
    const location = useLocation();

    return <TransitionGroup className="relative min-h-full">
        <CSSTransition
            key={location.key}
            classNames="slide"
            timeout={500}
        >
            <Container>
                <Switch location={location}>
                    {children}
                </Switch>
            </Container>
        </CSSTransition>
    </TransitionGroup>
};
