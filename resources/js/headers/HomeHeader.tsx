import React           from 'react';
import {HeaderWrapper} from "./partial/HeaderWrapper";
import {Cart}          from "./partial/Cart";
import {useAuth}       from "../selectors";

export const HomeHeader: React.FC = () => {
    const auth = useAuth();

    return <HeaderWrapper>
        <div className="flex justify-between items-center px-6">
            <h2 className="text-xl font-medium">
                <span>Olá</span>
                {auth.me?.name && <span>, {auth.me?.name}</span>}
                <span> 👋</span>
            </h2>
            <Cart/>
        </div>
        {/*<div className="px-6">*/}
        {/*    <input*/}
        {/*        placeholder="Pesquisar produtos..."*/}
        {/*        className="w-full py-3 px-6 rounded-full bg-primary-100 bg-opacity-50 placeholder-white font-medium"*/}
        {/*        type="text"*/}
        {/*    />*/}
        {/*</div>*/}
    </HeaderWrapper>
};
