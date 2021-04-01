import {useSelector} from "react-redux";
import {RootState} from "./store";

export function useToasts() {
    return useSelector((state: RootState) => state.toasts);
}

export function useAuth() {
    return useSelector((state: RootState) => state.auth);
}
