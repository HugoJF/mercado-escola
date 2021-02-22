import {useMutation} from "react-query";
import {api}         from "../../api";

export function useProductUpdate(id: Id) {
    return useMutation((data: FormData) => api.products.update(id, data));
}
