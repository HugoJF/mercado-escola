import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {isEmpty} from "../helpers/Functions";
import {Loading} from "../components/ui/Loading";
import {ProductHeader} from "./ProductHeader";
import {useProduct} from "../queries/useProduct";
import {useFavorites} from "../queries/useFavorites";
import {useFavoriteCreate} from "../mutations/useFavoriteCreate";
import {useFavoriteDestroy} from "../mutations/useFavoriteDestroy";

type Params = {
    productId: string;
}

export const ProductHeaderContainer: React.FC = () => {
    const [favorite, setFavorite] = useState(false);
    const params = useParams<Params>();
    const productId = parseInt(params.productId);

    const product = useProduct(productId);
    const favorites = useFavorites();

    const favoriteCreate = useFavoriteCreate();
    const favoriteDestroy = useFavoriteDestroy();

    useEffect(() => {
        const items = favorites?.data?.data?.data.filter(favorite => favorite.id === productId);
        setFavorite(!isEmpty(items));
    }, [favorites]);

    async function handleOnToggleFavorite() {
        setFavorite(!favorite);

        if (favorite) {
            favoriteDestroy.mutate(productId);
        } else {
            favoriteCreate.mutate(productId);
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
