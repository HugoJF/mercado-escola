import {useMutation, useQueryClient} from "react-query";
import {api} from "../api";

export function useCartAddress() {
    const queryClient = useQueryClient();

    return useMutation(
        (addressId: number | null) => api.cart.updateAddress(addressId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries()
            }
        }
    );
}
