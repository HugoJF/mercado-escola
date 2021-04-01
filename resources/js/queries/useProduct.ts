import {useQuery} from "react-query";
import {api} from "../api";

export function useProduct(id: Id) {
    return useQuery(
        ['product', id],
        () => api.products.show(id)
    )
}
