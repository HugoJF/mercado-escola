import React, {useEffect}  from "react";
import {useDispatch}       from "react-redux";
import {Dispatch}          from "../../../store";
import {useOpenings}       from "../../../selectors";
import {useParams}         from "react-router-dom";
import {Title}             from "../../../components/ui/Title";
import {OpeningProperties} from "../../../types/openings";
import {OpeningForm}       from "../../../components/openings/OpeningForm";
import {PagePadding}       from "../../../containers/PagePadding";
import useNavigation       from "../../../hooks/useNavigation";

export const AdminOpeningEdit: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const {go} = useNavigation();
    const params = useParams<{ openingId: string }>();
    const openings = useOpenings();

    const openingId = parseInt(params.openingId);
    const opening = openings.openings[openingId];

    useEffect(() => {
        dispatch.openings.index();
    }, []);

    async function updateOpening(data: OpeningProperties) {
        try {
            await dispatch.openings.update({id: openingId, data: data});
            go('/admin/aberturas');
        } catch (e) {
            if (e.response.data.errors)  {
                throw {errors: e.response.data.errors};
            } else {
                throw e;
            }
        }
    }

    // @ts-ignore
    return <PagePadding>
        <Title>Atualizando {opening?.id}</Title>

        <OpeningForm
            opening={opening}
            onSubmit={updateOpening}
            action="Atualizar"
        />
    </PagePadding>
};
