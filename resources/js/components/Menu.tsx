import React                     from "react";
import Ripples                   from "react-ripples";
import {useHistory}              from "react-router-dom";
import {Book, Heart, Home, User} from "react-feather";

const buttons = {
    Home: {
        to: '/',
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


interface MenuButton {
    onClick: () => void;
    selected: boolean;
}

const MenuItem: React.FC<MenuButton> = ({onClick, selected, children}) => (
    <Ripples onClick={onClick} className={`transition-colors duration-150
        w-full flex flex-grow flex-col pt-8 pb-3 items-center justify-between
        hover:bg-gray-100 ${selected ? 'text-secondary-600' : 'text-gray-300'} cursor-pointer`
    }>
        {children}
    </Ripples>
);
export const Menu: React.FC = () => {
    const history = useHistory();

    function redirect(to: string) {
        console.log(to);
        history.push(to);
    }

    return <div className="flex items-stretch justify-around bg-white shadow-menu">
        {Object.entries(buttons).map(([name, details]) => {
            const Icon = details.icon;

            return <MenuItem
                key={name}
                onClick={() => redirect(details.to)}
                selected={location.pathname === details.to}
            >
                <Icon size={30} className="mb-3 inline-block"/>
                <span className="font-medium select-none">{name}</span>
            </MenuItem>
        })}
    </div>
};
