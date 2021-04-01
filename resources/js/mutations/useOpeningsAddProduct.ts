import {useMutation, useQueryClient} from "react-query";
import {api} from "../api";

type Params = {
    openingId: Id;
    productId: Id;
}

export function useOpeningsAddProduct() {
    const queryClient = useQueryClient();

    return useMutation(
        (params: Params) => api.openings.addProduct(params.openingId, params.productId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries()
            }
        }
    )
}
