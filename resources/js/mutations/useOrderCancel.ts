import {useMutation, useQueryClient} from "react-query";
import {OrderType} from "@type/orders";
import {api} from "~/api";

export function useOrderCancel() {
    const queryClient = useQueryClient();

    return useMutation(
        (order: OrderType) => api.orders.cancel(order),
        {
            onSuccess: () => {
                queryClient.invalidateQueries()
            }
        }
    )
}
