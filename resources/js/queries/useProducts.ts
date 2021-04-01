import {useQuery} from "react-query";
import {api} from "../api";

export function useProducts(param?: number[]) {
    if (Array.isArray(param)) {
        return useQuery(
            ['order-', param.join(',')],
            () => api.products.ids(param)
        )
    } else {
        return useQuery(
            'products',
            api.products.index
        )
    }
}
