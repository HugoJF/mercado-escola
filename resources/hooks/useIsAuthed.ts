import {useAuth} from "../js/selectors";

export default function useIsAuthed(): boolean {
    const auth = useAuth();

    return !!auth?.me?.email;
}
