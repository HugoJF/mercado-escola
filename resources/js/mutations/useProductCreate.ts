import {useMutation, useQueryClient} from "react-query";
import {api} from "../api";

export function useProductCreate() {
    const queryClient = useQueryClient();

    return useMutation(
        (data: FormData) => api.products.create(data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries()
            }
        }
    );
}
