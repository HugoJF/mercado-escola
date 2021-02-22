import {useMutation, useQueryClient} from "react-query";
import {api}                         from "../api";
import {AddressProperties}           from "../types/addresses";
import {OpeningProperties}           from "../types/openings";

type Params = {
    id: Id;
    data: OpeningProperties;
}

export function useOpeningsUpdate() {
    const queryClient = useQueryClient();

    return useMutation(
        (params: Params) => api.openings.update(params.id, params.data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries()
            }
        }
    )
}
