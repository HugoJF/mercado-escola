import React from 'react';
import {HeaderWrapper} from "./partials/HeaderWrapper";
import {Cart} from "./partials/Cart";
import {useAuth} from "../selectors";

export const HomeHeader: React.FC = () => {
    const auth = useAuth();

    return <HeaderWrapper>
        <div className="py-4 flex justify-between items-center px-6">
            <h2 className="text-xl font-medium">
                <span>Olá</span>
                {auth.me?.name && <span>, {auth.me?.name}</span>}
                <span> 👋</span>
            </h2>
        </div>
        <Cart/>
    </HeaderWrapper>
};
