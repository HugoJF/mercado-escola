import React from "react";
import {Loading} from "@components/ui/Loading";
import {AdminOpeningReport} from "./AdminOpeningReport";
import {useOpeningReport} from "@queries/useOpeningReport";
import {useParams} from "react-router-dom";

type Params = {
    openingId: string;
}

export const AdminOpeningReportContainer: React.FC = () => {
    const params = useParams<Params>();

    const {status, data, error, isFetching} = useOpeningReport(params.openingId);

    return data ?
        <AdminOpeningReport report={data.data}/>
        :
        <Loading/>
};
