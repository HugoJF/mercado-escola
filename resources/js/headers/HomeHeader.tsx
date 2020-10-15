import React           from 'react';
import {ShoppingCart}  from "react-feather";
import {HeaderWrapper} from "./partial/HeaderWrapper";

export const HomeHeader: React.FC = () => {
    return <HeaderWrapper>
        <div className="flex justify-between items-center px-6">
            <h2 className="text-xl font-medium">Olá, Maria 👋</h2>
            <ShoppingCart size={30}/>
        </div>
        <div className="px-6">
            <input
                placeholder="Pesquisar produtos..."
                className="w-full py-3 px-6 rounded-full bg-primary-100 bg-opacity-50 placeholder-white font-medium"
                type="text"
            />
        </div>
    </HeaderWrapper>
};
