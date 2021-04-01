import {useEffect} from "react";
import useLoading from "./useLoading";

export default function useLoadEffect(
    effect: () => Promise<void>,
    deps?: React.DependencyList
) {
    const {load, loading} = useLoading();

    useEffect(() => {
        load(async () => {
            await effect()
        })
    }, deps);

    return loading;
}
