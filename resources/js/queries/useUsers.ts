import {useQuery} from "react-query";
import {api} from "../api";

export function useUsers() {
    return useQuery(
        'users',
        api.users.index
    )
}
