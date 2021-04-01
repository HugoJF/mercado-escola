import {useMutation, useQueryClient} from "react-query";
import {OrdersProperties} from "../types/orders";
import {api} from "../api";

type Params = {
    id: Id;
    data: Partial<OrdersProperties>;
}

export function useOrderUpdate() {
    const queryClient = useQueryClient();

    return useMutation(
        (params: Params) => api.orders.update(params.id, params.data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries()
            }
        }
    )
}
