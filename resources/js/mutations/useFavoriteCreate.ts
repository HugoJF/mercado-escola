import {useMutation, useQueryClient} from "react-query";
import {api} from "../api";

export function useFavoriteCreate() {
    const queryClient = useQueryClient();

    return useMutation(
        (productId: number) => api.favorites.store(productId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries()
            }
        }
    );
}
