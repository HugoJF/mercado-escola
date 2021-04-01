import {useLocation} from "react-router-dom";
import queryString from 'query-string';
import {useMemo} from "react";
import useNavigation from "./useNavigation";

export default function usePagination() {
    const location = useLocation();
    const nav = useNavigation();
    const parsed = useMemo(() => queryString.parse(location.search), [location]);
    const page = useMemo(() => {
        let p = parsed.page ?? '1';

        if (Array.isArray(p)) {
            p = p[0];
        }

        return parseInt(p)
    }, [parsed]);

    function goToPage(page: number) {
        const newParams = {...parsed, ...{page}};
        const search = queryString.stringify(newParams);

        nav.go([location.pathname, search].join('?'))
    }

    function next() {
        goToPage(page + 1);
    }

    function back() {
        goToPage(page - 1);
    }

    return {page, goToPage, next, back}
}
