import React from "react";
import {useParams} from "react-router-dom";
import {Loading} from "../../../components/ui/Loading";
import {AdminOpeningView} from "./AdminOpeningView";
import {useOpening} from "../../../queries/useOpening";

type Params = {
    openingId: string;
}

export const AdminOpeningViewContainer: React.FC = () => {
    const params = useParams<Params>();

    const {status, data, error, isFetching} = useOpening(params.openingId);

    return data
        ?
        <AdminOpeningView
            opening={data.data.data}
        />
        :
        <Loading/>
};
