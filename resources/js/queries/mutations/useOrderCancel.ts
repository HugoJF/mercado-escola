import {useMutation} from "react-query";
import {useDispatch} from "react-redux";
import {Dispatch}    from "../../store";
import {OrderType}   from "../../types/orders";
import {api}         from "../../api";

export function useOrderCancel() {
    return useMutation((order: OrderType) => api.orders.cancel(order))
}
