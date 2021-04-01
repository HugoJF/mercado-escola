import {useMutation, useQueryClient} from "react-query";
import {api} from "../api";

export function useProductUpdate(id: Id) {
    const queryClient = useQueryClient();

    return useMutation(
        (data: FormData) => api.products.update(id, data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries()
            }
        }
    );
}
