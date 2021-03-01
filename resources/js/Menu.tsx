import React                               from "react";
import Ripples                             from "react-ripples";
import {Book, Heart, Home, Settings, User} from "react-feather";
import {useAuth}                           from "./selectors";
import useNavigation                       from "./hooks/useNavigation";
import clsx                                from "clsx";

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
    const {bindGo} = useNavigation();
    const auth = useAuth();

    return <div className="flex items-stretch justify-around bg-white shadow-menu">
        {Object.entries(buttons)
            .filter(([name, details]) => !(details.adminOnly || false) || auth?.me?.admin)
            .map(([name, details]) => {
                const Icon = details.icon;
                const isIn = location.pathname.startsWith(details.to);

                return <Ripples
                    key={name}
                    onClick={bindGo(details.to)}
                    className={clsx(
                        'transition-colors duration-150',
                        'w-full flex flex-grow flex-col pt-2 pb-1 items-center justify-between',
                        'hover:bg-gray-100 cursor-pointer', {
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
