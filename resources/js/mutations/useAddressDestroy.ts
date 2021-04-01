import {useMutation, useQueryClient} from "react-query";
import {api} from "../api";

export function useAddressDestroy() {
    const queryClient = useQueryClient();

    return useMutation(
        (id: Id) => api.addresses.destroy(id),
        {
            onSuccess: () => {
                queryClient.invalidateQueries()
            }
        }
    )
}
