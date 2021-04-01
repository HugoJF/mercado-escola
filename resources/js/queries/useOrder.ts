import {useQuery} from "react-query";
import {api} from "../api";

export function useOrder(id: Id) {
    return useQuery(
        ['order', id],
        () => api.orders.show(id)
    )
}
