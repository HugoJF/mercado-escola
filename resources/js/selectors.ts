import {useSelector} from "react-redux";
import {RootState}   from "./store";

export function useAuth() {
    return useSelector((state: RootState) => state.auth);
}
export function useAddresses() {
    return useSelector((state: RootState) => state.addresses);
}
