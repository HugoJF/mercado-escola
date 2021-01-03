import React, {useEffect, useState} from 'react';
import {useParams}                  from "react-router";
import {Heart}                      from "react-feather";
import {BackAndCart}                from "./partials/BackAndCart";
import {HeaderWrapper}              from "./partials/HeaderWrapper";
import {useFavorites, useProducts}  from "../selectors";
import {useDispatch}                from "react-redux";
import {Dispatch}                   from "../store";
import classNames                   from 'classnames';

export const ProductHeader: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const [favorite, setFavorite] = useState(false);
    const favorites = useFavorites();
    const params = useParams<{ productId: string }>();
    const products = useProducts();

    const productId = parseInt(params.productId);
    const product = products.products[productId];

    useEffect(() => {
        dispatch.favorites.index();
    }, []);

    useEffect(() => {
        setFavorite(favorites.favorites.indexOf(productId) >= 0);
    }, [favorites.favorites]);

    async function toggleFavorite() {
        setFavorite(!favorite);

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
            <h2 className="text-2xl font-medium truncate leading-none">{product.name}</h2>
            <div
                className={classNames(
                    `transition-colors duration-50`,
                    {
                        'text-red-500 ': favorite,
                    }
                )}
                onClick={toggleFavorite}
            >
                <Heart
                    className="transition-colors duration-150 fill-current"
                    fillOpacity={favorite ? 100 : 0}
                    size={30}
                />
            </div>
        </div>
    </HeaderWrapper>
};
