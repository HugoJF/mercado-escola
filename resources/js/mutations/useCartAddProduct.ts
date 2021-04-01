import {useMutation, useQueryClient} from "react-query";
import {api} from "../api";

type Params = {
    product_id: Id,
    quantity: number;
}

export function useCartAddProduct() {
    const queryClient = useQueryClient();

    return useMutation(
        (params: Params) => api.cart.addProduct(params.product_id, params.quantity),
        {
            onSuccess: () => {
                queryClient.invalidateQueries()
            }
        }
    );
}
