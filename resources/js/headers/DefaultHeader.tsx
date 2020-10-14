import React                       from 'react';
import {ChevronLeft, ShoppingCart} from "react-feather";
import {useHistory}                from "react-router";

export const DefaultHeader: React.FC = () => {
    const history = useHistory();

    return <div className="stickys top-0 w-flex px-6 py-6 space-y-6 flex-col items-stretch bg-primary-600 text-white shadow-md">
        <div className="flex justify-between items-center px-6">
            <ChevronLeft size={30} className="cursor-pointer" onClick={history.goBack}/>
            <ShoppingCart size={30}/>
        </div>
    </div>
};
