import {useMutation, useQueryClient} from "react-query";
import {api}                         from "../api";
import {AddressProperties}           from "../types/addresses";
import {OpeningProperties}           from "../types/openings";

export function useOpeningsCreate() {
    const queryClient = useQueryClient();

    return useMutation(
        (data: OpeningProperties) => api.openings.store(data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries()
            }
        }
    )
}
