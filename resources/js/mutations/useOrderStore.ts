import {useMutation, useQueryClient} from "react-query";
import {api} from "../api";

export function useOrderStore() {
    const queryClient = useQueryClient();

    return useMutation(
        api.orders.create,
        {
            onSuccess: () => {
                queryClient.invalidateQueries()
            }
        }
    )
}
