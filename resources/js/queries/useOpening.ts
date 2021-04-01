import {useQuery} from "react-query";
import {api} from "../api";

export function useOpening(id: Id) {
    return useQuery(
        ['opening', id],
        () => api.openings.show(id)
    )
}
