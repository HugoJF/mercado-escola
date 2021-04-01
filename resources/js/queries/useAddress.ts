import {useQuery} from "react-query";
import {api} from "../api";

export function useAddress(id: Id | null) {
    if (!id) {
        return null;
    }

    return useQuery(
        ['address', id],
        () => api.addresses.show(id)
    )
}
