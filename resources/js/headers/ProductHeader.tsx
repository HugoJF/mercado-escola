import React, {useState}                     from 'react';
import {useHistory, useParams}               from "react-router";
import {Bookmark, ChevronLeft, ShoppingCart} from "react-feather";

export const ProductHeader: React.FC = () => {
    const [favorite, setFavorite] = useState(false);
    const history = useHistory();
    const params = useParams<{ productId: string }>();

    return <div className="px-6 py-6 bg-primary-600 text-white shadow-md">
        <div className="flex justify-between items-center px-6">
            <ChevronLeft size={30} className="cursor-pointer" onClick={history.goBack}/>
            <ShoppingCart size={30}/>
        </div>

        <div className="flex justify-between items-center mt-12 px-6">
            <h2 className="text-3xl font-medium">{params.productId}</h2>
            <div
                className={`transition-all duration-200 p-3 border-2 ${favorite && 'bg-secondary-500 border-secondary-500 text-white'} rounded-lg`}
                onClick={() => setFavorite(!favorite)}
            >
                <Bookmark size={30}/>
            </div>
        </div>
    </div>
};
