import React          from 'react';
import {ShoppingCart} from "react-feather";
import {useCart}      from "../../selectors";
import {Link}         from "react-router-dom";

export const Cart: React.FC = () => {
    const cart = useCart();

    const hasItems = Object.values(cart.items).length > 0;

    return <Link to="/carrinho" className="px-1 relative">
        {hasItems && <div className="animate-bounce absolute top-0 right-0 w-2 h-2 bg-red-500 text-sm font-medium rounded-full"/>}
        <ShoppingCart size={24}/>
    </Link>
};
