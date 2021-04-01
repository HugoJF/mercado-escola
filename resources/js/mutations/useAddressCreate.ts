import {useMutation, useQueryClient} from "react-query";
import {api} from "../api";
import {AddressProperties} from "../types/addresses";

export function useAddressCreate() {
    const queryClient = useQueryClient();

    return useMutation(
        (data: AddressProperties) => api.addresses.store(data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries()
            }
        }
    )
}
