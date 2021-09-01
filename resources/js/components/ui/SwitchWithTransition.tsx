import {CSSTransition, TransitionGroup} from "react-transition-group";
import {Container} from "@containers/Container";
import {matchPath, Switch, useLocation} from "react-router-dom";
import React from "react";

export const SwitchWithTransitions: React.FC =
    ({children}) => {
        const location = useLocation();

        let element, match: any;
        // TODO: figure out why context is used
        // https://github.com/ReactTraining/react-router/blob/master/packages/react-router/modules/Switch.js#L16
        const context = {match: 'UNK'};

        // We use React.Children.forEach instead of React.Children.toArray().find()
        // here because toArray adds keys to all child elements and we do not want
        // to trigger an unmount/remount for two <Route>s that render the same
        // component at different URLs.
        React.Children.forEach(children, child => {
            if (match == null && React.isValidElement(child)) {
                element = child;

                const path = child.props.path || child.props.from;

                match = path
                    ? matchPath(location.pathname, {...child.props, path})
                    : context.match;
            }
        });

        return <TransitionGroup className="min-h-full">
            <CSSTransition
                key={match?.url ?? location.pathname}
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
