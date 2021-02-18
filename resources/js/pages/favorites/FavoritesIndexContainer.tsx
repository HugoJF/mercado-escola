import React            from "react";
import {useQuery}       from "react-query";
import {api}            from "../../api";
import {Loading}        from "../../components/ui/Loading";
import {FavoritesIndex} from "./FavoritesIndex";

export const FavoritesIndexContainer: React.FC = () => {
    const {status, data, error, isFetching} = useQuery(
        'favorites',
        api.favorites.index
    );

    return data
        ?
        <FavoritesIndex
            favorites={data.data.data}
        />
        :
        <Loading/>
};
