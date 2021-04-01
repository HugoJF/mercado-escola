import {useQuery} from "react-query";
import {api} from "../api";

export function useCart() {
    return useQuery(
        ['cart'],
        api.cart.index
    )
}
