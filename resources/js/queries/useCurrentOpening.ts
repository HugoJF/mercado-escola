import {useQuery} from "react-query";
import {api} from "../api";

export function useCurrentOpening() {
    return useQuery(
        'currentOpening',
        api.openings.current
    )
}
