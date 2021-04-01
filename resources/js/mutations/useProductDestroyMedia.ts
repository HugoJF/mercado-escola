import {useMutation, useQueryClient} from "react-query";
import {api} from "../api";

type Params = {
    productId: Id;
    mediaId: Id;
}

export function useProductDestroyMedia() {
    const queryClient = useQueryClient();

    return useMutation(
        (params: Params) => api.products.destroyMedia(params.productId, params.mediaId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries()
            }
        }
    );
}
