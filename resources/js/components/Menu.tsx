import React                     from "react";
import Ripples                   from "react-ripples";
import {useHistory, useLocation} from "react-router-dom";
import {Book, Heart, Home, User} from "react-feather";

const buttons = {
    Home: {
        to: '/home',
        icon: Home,
    },
    Favoritos: {
        to: '/favoritos',
        icon: Heart,
    },
    Pedidos: {
        to: '/pedidos',
        icon: Book,
    },
    Conta: {
        to: '/conta',
        icon: User,
    },
};

export const Menu: React.FC = () => {
    const history = useHistory();
    const location = useLocation();

    function redirect(to: string) {
        // TODO: remove
        console.log(to);
        history.push(to);
    }

    return <div className="flex items-stretch justify-around bg-white shadow-menu">
        {Object.entries(buttons).map(([name, details]) => {
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
