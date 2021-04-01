import {useMutation, useQueryClient} from "react-query";
import {api} from "../api";

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
