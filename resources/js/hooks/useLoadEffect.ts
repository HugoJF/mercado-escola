import {useEffect} from "react";
import useLoading  from "./useLoading";

export default function useLoadEffect(
    effect: (Promise<void>[]) | (() => Promise<void>),
    deps?: React.DependencyList
) {
    const {load, loading} = useLoading();

    useEffect(() => {
        load(async () => {
            if (typeof effect === 'function') {
                await effect()
            } else {
                await Promise.all(effect);
            }
        })
    }, deps);

    return loading;
}
