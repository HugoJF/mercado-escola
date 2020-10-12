import React                             from "react";
import {Heart, HomeAlt, Profile, Readme} from "../css.gg";
import Ripples                           from "react-ripples";
import {useHistory}                      from "react-router-dom";

const buttons = {
    Home: {
        to: '/',
        icon: HomeAlt,
    },
    Favoritos: {
        to: '/favoritos',
        icon: Heart,
    },
    Pedidos: {
        to: '/pedidos',
        icon: Readme,
    },
    Conta: {
        to: '/conta',
        icon: Profile,
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

    return <>
        <div className="sticky left-0 right-0 bottom-0 flex items-stretch justify-around bg-white shadow-2xl">
            {Object.entries(buttons).map(([name, details]) => {
                const Icon = details.icon;

                return <MenuItem
                    key={name}
                    onClick={() => redirect(details.to)}
                    selected={location.pathname === details.to}
                >
                    <Icon className="mb-3 inline-block ggs-1/2"/>
                    <span className="font-medium select-none">{name}</span>
                </MenuItem>
            })}
        </div>
    </>
};
