import React                             from "react";
import {Heart, HomeAlt, Profile, Readme} from "../css.gg";
import Ripples                           from 'react-ripples'

const MyRipples: React.FC = ({children}) => (
    <Ripples className="flex-grow">
        {children}
    </Ripples>
);

const Selected: React.FC = ({children}) => (
    <MyRipples>
        <div className="w-full flex flex-col pt-8 pb-3 items-center justify-between text-secondary-600">
            {children}
        </div>
    </MyRipples>
);

const Item: React.FC = ({children}) => (
    <MyRipples>
        <div className="w-full flex flex-col pt-8 pb-3 items-center justify-between text-gray-300">
            {children}
        </div>
    </MyRipples>
);

export const Menu: React.FC = ({children}) => {
    return <>
        <div>
            {children}
        </div>
        <div className="fixed left-0 right-0 bottom-0 flex items-stretch justify-around px-4 bg-white shadow-2xl">
            <Selected>
                <HomeAlt className="mb-3 inline-block ggs-1/2"/>
                <span className="font-medium">Home</span>
            </Selected>
            <Item>
                <Heart className="mb-3 inline-block ggs-1/2"/>
                <span className="font-medium">Favoritos</span>
            </Item>
            <Item>
                <Readme className="mb-3 inline-block ggs-1/2"/>
                <span className="font-medium">Pedidos</span>
            </Item>
            <Item>
                <Profile className="mb-3 inline-block ggs-1/2"/>
                <span className="font-medium">Conta</span>
            </Item>
        </div>
    </>
};
