import {useQuery} from "react-query";
import {api} from "../api";

export function useOpenings() {
    return useQuery(
        'openings',
        api.openings.index
    )
}
