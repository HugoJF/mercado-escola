import React, {useEffect, useState} from 'react';
import {useParams}                  from "react-router";
import {useDispatch}                from "react-redux";
import {Dispatch}                   from "../store";
import {useQuery}                   from "react-query";
import {api}                        from "../api";
import {isEmpty}                    from "../helpers/Functions";
import {Loading}                    from "../components/ui/Loading";
import {ProductHeader}              from "./ProductHeader";

export const ProductHeaderContainer: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const [favorite, setFavorite] = useState(false);
    const params = useParams<{ productId: string }>();
    const productId = parseInt(params.productId);

    const product = useQuery(
        ['product', productId],
        () => api.products.show(productId)
    );

    const favorites = useQuery(
        'favorites',
        api.favorites.index
    );

    useEffect(() => {
        const items = favorites?.data?.data?.data.filter(favorite => favorite.id === productId);
        setFavorite(!isEmpty(items));
    }, [favorites]);

    async function handleOnToggleFavorite() {
        setFavorite(!favorite);

        if (favorite) {
            dispatch.favorites.destroy(productId);
        } else {
            dispatch.favorites.create(productId);
        }
    }

    return product.data && favorites.data
        ?
        <ProductHeader
            product={product.data.data.data}
            favorite={favorite}
            onToggleFavorite={handleOnToggleFavorite}
        />
        :
        <Loading/>
};
