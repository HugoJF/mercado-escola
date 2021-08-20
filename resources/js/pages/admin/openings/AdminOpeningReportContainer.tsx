import React from "react";
import {Loading} from "@components/ui/Loading";
import {AdminOpeningReport} from "./AdminOpeningReport";
import {useOpeningReport} from "@queries/useOpeningReport";

export const AdminOpeningReportContainer: React.FC = () => {
    const {status, data, error, isFetching} = useOpeningReport(1);

    return data ?
        <AdminOpeningReport report={data.data}/>
        :
        <Loading/>
};
