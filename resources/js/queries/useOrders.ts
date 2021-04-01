import {useQuery} from "react-query";
import {api} from "../api";

export function useOrders(page: number = 1) {
    return useQuery(
        ['orders', page],
        () => api.orders.index(page)
    )
}
