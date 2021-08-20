import React from "react";
import {Loading} from "@components/ui/Loading";
import {FavoritesIndex} from "./FavoritesIndex";
import {useFavorites} from "@queries/useFavorites";

export const FavoritesIndexContainer: React.FC = () => {
    const {status, data, error, isFetching} = useFavorites();

    return data
        ?
        <FavoritesIndex
            favorites={data.data.data}
        />
        :
        <Loading/>
};
