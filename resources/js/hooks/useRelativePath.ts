import {useRouteMatch} from "react-router";

export default function useRelativePath() {
    const match = useRouteMatch();

    return (path: string) => `${match.url}${path}`;
}
