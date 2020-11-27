import React, {useEffect}          from 'react';
import {useParams}                 from "react-router";
import {Bookmark}                  from "react-feather";
import {BackAndCart}               from "./partial/BackAndCart";
import {HeaderWrapper}             from "./partial/HeaderWrapper";
import {useFavorites, useProducts} from "../selectors";
import {useDispatch}               from "react-redux";
import {Dispatch}                  from "../store";
import classNames                  from 'classnames';

export const ProductHeader: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const favorites = useFavorites();
    const params = useParams<{ productId: string }>();
    const products = useProducts();

    const productId = parseInt(params.productId);
    const product = products.products[productId];
    const favorite = favorites.favorites.indexOf(productId) >= 0;

    useEffect(() => {
        dispatch.favorites.index();
    }, []);

    function toggleFavorite() {
        if (favorite) {
            dispatch.favorites.destroy(productId);
        } else {
            dispatch.favorites.create(productId);
        }
    }

    if (!product) return null;

    return <HeaderWrapper>
        <BackAndCart/>

        <div className="flex justify-between items-center mt-12 px-6">
            <h2 className="text-3xl font-medium truncate">{product.name}</h2>

            <div
                className={classNames(
                    `transition-all duration-200 p-3 border-2 rounded-lg`,
                    {
                        'bg-secondary-500 border-secondary-500 text-white': favorite,
                    }
                )}
                onClick={toggleFavorite}
            >
                <Bookmark size={30}/>
            </div>
        </div>
    </HeaderWrapper>
};
