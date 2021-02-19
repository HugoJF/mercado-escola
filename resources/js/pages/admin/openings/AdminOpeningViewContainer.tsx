import React              from "react";
import {useParams}        from "react-router-dom";
import {Loading}          from "../../../components/ui/Loading";
import {AdminOpeningView} from "./AdminOpeningView";
import {useOpening}       from "../../../queries/useOpening";

export const AdminOpeningViewContainer: React.FC = () => {
    const params = useParams<{ openingId: string }>();

    const {status, data, error, isFetching} = useOpening(params.openingId);

    return data
        ?
        <AdminOpeningView
            opening={data.data.data}
        />
        :
        <Loading/>
};
