import React, {useState} from 'react';
import {useParams}       from "react-router";
import {Bookmark}        from "react-feather";
import {BackAndCart}     from "./partial/BackAndCart";
import {HeaderWrapper}   from "./partial/HeaderWrapper";
import {useProducts}     from "../selectors";

export const ProductHeader: React.FC = () => {
    const [favorite, setFavorite] = useState(false);
    const params = useParams<{ productId: string }>();
    const products = useProducts();

    const product = products.products[parseInt(params.productId)];

    return <HeaderWrapper>
        <BackAndCart/>

        <div className="flex justify-between items-center mt-12 px-6">
            <h2 className="text-3xl font-medium">{product.title}</h2>

            <div
                className={`transition-all duration-200 p-3 border-2 ${favorite && 'bg-secondary-500 border-secondary-500 text-white'} rounded-lg`}
                onClick={() => setFavorite(!favorite)}
            >
                <Bookmark size={30}/>
            </div>
        </div>
    </HeaderWrapper>
};
