import {useQuery} from "react-query";
import {api} from "../api";

export function useFavorites() {
    return useQuery(
        'favorites',
        api.favorites.index
    )
}
