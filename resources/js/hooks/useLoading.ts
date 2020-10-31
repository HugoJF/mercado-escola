import {useAuth}  from "../selectors";
import {useState} from "react";

export default function useLoading() {
    const [loading, setLoading] = useState(false);

    async function load(runner: () => void|Promise<void>) {
        setLoading(true);
        try {
            await runner();
        } catch (e) {
            //
        }
        setLoading(false);
    }

    return {loading, load, setLoading};
}
