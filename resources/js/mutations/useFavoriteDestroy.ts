import {useMutation, useQueryClient} from "react-query";
import {api} from "../api";

export function useFavoriteDestroy() {
    const queryClient = useQueryClient();

    return useMutation(
        (productId: number) => api.favorites.destroy(productId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries()
            }
        }
    );
}
