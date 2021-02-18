import React               from "react";
import {useDispatch}       from "react-redux";
import {Dispatch}          from "../../../store";
import {useParams}         from "react-router-dom";
import {OpeningProperties} from "../../../types/openings";
import useNavigation       from "../../../hooks/useNavigation";
import {useQuery}          from "react-query";
import {api}               from "../../../api";
import {Loading}           from "../../../components/ui/Loading";
import {AdminOpeningEdit}  from "./AdminOpeningEdit";

export const AdminOpeningEditContainer: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const {go} = useNavigation();
    const params = useParams<{ openingId: string }>();
    const openingId = parseInt(params.openingId);

    const {status, data, error, isFetching} = useQuery(
        ['opening', openingId],
        () => api.openings.show(openingId)
    );

    async function handleOnSubmit(data: OpeningProperties) {
        try {
            await dispatch.openings.update({id: openingId, data: data});
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
