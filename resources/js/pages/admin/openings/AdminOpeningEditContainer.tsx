import React from "react";
import {useParams} from "react-router-dom";
import {OpeningProperties} from "@type/openings";
import useNavigation from "@hooks/useNavigation";
import {Loading} from "@components/ui/Loading";
import {AdminOpeningEdit} from "./AdminOpeningEdit";
import {useOpening} from "@queries/useOpening";
import {useOpeningsUpdate} from "@mutations/useOpeningsUpdate";

type Params = {
    openingId: string;
}

export const AdminOpeningEditContainer: React.FC = () => {
    const {go} = useNavigation();
    const params = useParams<Params>();
    const openingId = parseInt(params.openingId);
    const openingUpdate = useOpeningsUpdate();

    const {status, data, error, isFetching} = useOpening(openingId);

    async function handleOnSubmit(data: OpeningProperties) {
        try {
            await openingUpdate.mutateAsync({id: openingId, data: data});
            go('/admin/aberturas');
        } catch (e) {
            if (e.response.data.errors) {
                throw {errors: e.response.data.errors};
            } else {
                throw e;
            }
        }
    }

    // @ts-ignore
    return data
        ?
        <AdminOpeningEdit
            opening={data.data.data}
            onSubmit={handleOnSubmit}
        />
        :
        <Loading/>
};
