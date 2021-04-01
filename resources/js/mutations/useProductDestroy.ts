import {useMutation, useQueryClient} from "react-query";
import {api} from "../api";

export function useProductDestroy() {
    const queryClient = useQueryClient();

    return useMutation(
        (id: Id) => api.products.destroy(id),
        {
            onSuccess: () => {
                queryClient.invalidateQueries()
            }
        }
    );
}
