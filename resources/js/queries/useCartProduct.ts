import {useQuery} from "react-query";
import {api} from "../api";

export function useCartProduct(productId: Id) {
    return useQuery(
        ['cart', 'product', productId],
        () => api.cart.product(productId)
    )
}
