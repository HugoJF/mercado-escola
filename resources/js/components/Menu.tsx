import React                               from "react";
import Ripples                             from "react-ripples";
import {useHistory, useLocation}           from "react-router-dom";
import {Book, Heart, Home, Settings, User} from "react-feather";
import {useAuth}                           from "../selectors";

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

            return <Ripples
                key={name}
                onClick={() => redirect(details.to)}
                className={`transition-colors duration-150
                    w-full flex flex-grow flex-col pt-4 pb-2 items-center justify-between
                    hover:bg-gray-100 ${location.pathname.startsWith(details.to) ? 'text-secondary-600' : 'text-gray-500'} cursor-pointer`
                }
            >
                <Icon size={30} className="inline-block"/>
                <span className="font-medium select-none">{name}</span>
            </Ripples>

        })}
    </div>
};
