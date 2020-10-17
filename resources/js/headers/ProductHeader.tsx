import React, {useEffect, useState} from 'react';
import {useParams}                  from "react-router";
import {Bookmark}                   from "react-feather";
import {BackAndCart}                from "./partial/BackAndCart";
import {HeaderWrapper}             from "./partial/HeaderWrapper";
import {useFavorites, useProducts} from "../selectors";
import {useDispatch}               from "react-redux";
import {Dispatch}                   from "../store";

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

    return <HeaderWrapper>
        <BackAndCart/>

        <div className="flex justify-between items-center mt-12 px-6">
            <h2 className="text-3xl font-medium">{product.title}</h2>

            <div
                className={`transition-all duration-200 p-3 border-2 ${favorite && 'bg-secondary-500 border-secondary-500 text-white'} rounded-lg`}
                onClick={toggleFavorite}
            >
                <Bookmark size={30}/>
            </div>
        </div>
    </HeaderWrapper>
};
