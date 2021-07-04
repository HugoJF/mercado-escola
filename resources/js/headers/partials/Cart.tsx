import React from 'react';
import {ShoppingCart} from "react-feather";
import {Link} from "react-router-dom";
import {useCart} from "../../queries/useCart";
import {PriceFormatter} from "../../components/ui/PriceFormatter";

export const Cart: React.FC = () => {
    const cart = useCart();

    const itemCount = cart?.data?.data?.products?.length;
    const total = cart?.data?.data?.cost;

    if (!itemCount) {
        return null;
    }

    return <Link to="/carrinho" className="flex justify-between px-5 py-3 bg-red-500">
        <div className="relative">
            <ShoppingCart/>
            <div className="absolute top-[-0.25rem] right-[-0.25rem] flex items-center justify-center w-4 h-4 bg-white text-sm text-red-500 rounded-full shadow">
                {itemCount}
            </div>
        </div>
        <div>Ver carrinho</div>
        <div>
            <PriceFormatter price={total ?? 0} cents/>
        </div>
    </Link>
};
