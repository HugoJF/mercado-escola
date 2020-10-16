import {useSelector} from "react-redux";
import {RootState}   from "./store";

export function useAuth() {
    return useSelector((state: RootState) => state.auth);
}
export function useAddresses() {
    return useSelector((state: RootState) => state.addresses);
}
export function useOpenings() {
    return useSelector((state: RootState) => state.openings);
}
export function useProducts() {
    return useSelector((state: RootState) => state.products);
}
