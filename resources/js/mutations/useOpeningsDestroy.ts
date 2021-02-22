import {useMutation, useQueryClient} from "react-query";
import {api}                         from "../api";
import {AddressProperties}           from "../types/addresses";
import {OpeningProperties}           from "../types/openings";

export function useOpeningsDestroy() {
    const queryClient = useQueryClient();

    return useMutation(
        (id: Id) => api.openings.destroy(id),
        {
            onSuccess: () => {
                queryClient.invalidateQueries()
            }
        }
    )
}
