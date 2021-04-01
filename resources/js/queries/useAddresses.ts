import {useQuery} from "react-query";
import {api} from "../api";

export function useAddresses() {
    return useQuery(
        'addresses',
        api.addresses.index
    )
}
