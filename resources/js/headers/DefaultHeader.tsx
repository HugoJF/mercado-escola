import React          from 'react';
import {ShoppingCart} from "../css.gg";

export const DefaultHeader: React.FC = () => {
    return <div className="stickys top-0 w-flex px-6 py-6 space-y-6 flex-col items-stretch bg-primary-600 text-white shadow-md">
        <div className="flex justify-between items-center px-6">
            <h2 className="text-xl font-medium">Olá, Maria 👋</h2>
            <ShoppingCart className="ggs-1/2"/>
        </div>
    </div>
};
