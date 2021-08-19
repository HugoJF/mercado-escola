import {useQuery} from "react-query";
import {api} from "../api";

export function useOpeningReport(id: Id) {
    return useQuery(
        ['opening', id, 'report'],
        () => api.openings.report(id)
    )
}
