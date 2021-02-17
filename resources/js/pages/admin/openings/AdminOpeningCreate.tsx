import React               from "react";
import {OpeningProperties} from "../../../types/openings";
import {useDispatch}       from "react-redux";
import {Dispatch}          from "../../../store";
import {Title}             from "../../../components/ui/Title";
import {OpeningForm}       from "../../../components/openings/OpeningForm";
import {PagePadding}       from "../../../containers/PagePadding";
import useNavigation       from "../../../hooks/useNavigation";

export const AdminOpeningCreate: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const {go} = useNavigation();

    async function createOpening(data: OpeningProperties) {
        try {
            await dispatch.openings.store(data);
            go('/admin/aberturas');
        } catch (e) {
            throw {errors: e.response.data.errors};
        }
    }


    return <PagePadding>
        <Title>Formulário de abertura</Title>

        <OpeningForm
            onSubmit={createOpening}
            action="Criar"
        />
    </PagePadding>
};
