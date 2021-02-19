import {useMutation} from "react-query";
import {useDispatch} from "react-redux";
import {Dispatch}    from "../../store";

export function useProductUpdate(id: Id) {
    const dispatch = useDispatch<Dispatch>();

    return useMutation((data: FormData) => dispatch.products.update({
        id, data,
    }))
}
