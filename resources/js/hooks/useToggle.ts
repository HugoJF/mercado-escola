import {useState} from "react";

export type useToggleProps = [
    number|undefined,
    (newId: number|undefined) => void,
]

export default function useToggle(initialId?: number): useToggleProps {
    const [id, setId] = useState<number|undefined>(initialId);

    function handleId(newId: number|undefined) {
        if (id === newId) {
            setId(undefined);
        } else {
            setId(newId);
        }
    }

    return [id, handleId];
}
