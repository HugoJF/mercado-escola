import {useQuery} from "react-query";
import {api}      from "../api";

export function useProducts() {
    return useQuery(
        'products',
        api.products.index
    )
}
