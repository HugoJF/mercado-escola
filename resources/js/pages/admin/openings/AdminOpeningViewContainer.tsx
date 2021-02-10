import React              from "react";
import {useParams}        from "react-router-dom";
import {Loading}          from "../../../components/ui/Loading";
import {AdminOpeningView} from "./AdminOpeningView";
import {useQuery}         from "react-query";
import {api}              from "../../../api";

export const AdminOpeningViewContainer: React.FC = () => {
    const params = useParams<{ openingId: string }>();
    const openingId = parseInt(params.openingId);

    const {status, data, error, isFetching} = useQuery(['opening', openingId], () => api.openings.show(openingId));

    return data ?
        <AdminOpeningView
            opening={data.data.data}
        />
        :
        <Loading/>
};
