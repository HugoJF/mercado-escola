import React              from "react";
import {useDispatch}      from "react-redux";
import {Dispatch}         from "../../../store";
import {useOpenings}      from "../../../selectors";
import {useParams}        from "react-router-dom";
import useLoadEffect      from "../../../hooks/useLoadEffect";
import {Loading}          from "../../../components/ui/Loading";
import {AdminOpeningView} from "./AdminOpeningView";

export const AdminOpeningViewContainer: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const params = useParams<{ openingId: string }>();
    const openings = useOpenings();
    const openingId = parseInt(params.openingId);
    const opening = openings.openings[openingId];

    const loading = useLoadEffect(async () => {
        await dispatch.openings.index();
    }, []);

    return <Loading loading={loading}>
        <AdminOpeningView
            opening={opening}
        />
    </Loading>
};
