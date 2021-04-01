import {useMutation, useQueryClient} from "react-query";
import {api} from "../api";

export function useCartRemoveProduct() {
    const queryClient = useQueryClient();

    return useMutation(
        (productId: Id) => api.cart.removeProduct(productId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries()
            }
        }
    );
}
