import React                       from 'react';
import {ChevronLeft, ShoppingCart} from "react-feather";
import {useHistory}                from "react-router";

export const BackAndCart: React.FC = () => {
    const history = useHistory();

    return <div className="flex justify-between items-center px-6">
        <ChevronLeft size={24} className="cursor-pointer" onClick={history.goBack}/>
        <ShoppingCart size={24}/>
    </div>
};
