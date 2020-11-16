import React                               from "react";
import Ripples                             from "react-ripples";
import {useHistory, useLocation}           from "react-router-dom";
import {Book, Heart, Home, Settings, User} from "react-feather";
import classNames                          from 'classnames';
import {useAuth}                           from "./selectors";

const buttons = {
    Home: {
        to: '/home',
        icon: Home,
        adminOnly: false,
    },
    Favoritos: {
        to: '/favoritos',
        icon: Heart,
        adminOnly: false,
    },
    Pedidos: {
        to: '/pedidos',
        icon: Book,
        adminOnly: false,
    },
    Admin: {
        to: '/admin',
        icon: Settings,
        adminOnly: true,
    },
    Conta: {
        to: '/conta',
        icon: User,
        adminOnly: false,
    },
};

export const Menu: React.FC = () => {
    const history = useHistory();
    const location = useLocation();
    const auth = useAuth();

    function redirect(to: string) {
        // TODO: remove
        console.log(to);
        history.push(to);
    }

    return <div className="flex items-stretch justify-around bg-white shadow-menu">
        {Object.entries(buttons)
            .filter(([name, details]) => !(details.adminOnly || false) || auth?.me?.admin)
            .map(([name, details]) => {
                const Icon = details.icon;
                const isIn = location.pathname.startsWith(details.to);

                return <Ripples
                    key={name}
                    onClick={() => redirect(details.to)}
                    className={classNames(
                        `transition-colors duration-150
                        w-full flex flex-grow flex-col pt-4 pb-2 items-center justify-between
                        hover:bg-gray-100 cursor-pointer`,
                        {
                            'text-secondary-600': isIn,
                            'text-gray-400': !isIn,
                        }
                    )}
                >
                    <Icon size={30} className="inline-block"/>
                    <span className="font-medium select-none">{name}</span>
                </Ripples>

            })}
    </div>
};
