import React               from "react";
import {OpeningProperties} from "../../../models/openings";
import {useDispatch}       from "react-redux";
import {Dispatch}          from "../../../store";
import {Title}             from "../../../components/ui/Title";
import {OpeningForm}       from "../../../components/openings/OpeningForm";
import {useHistory}        from "react-router";

export const AdminOpeningCreate: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const history = useHistory();

    async function createOpening(data: OpeningProperties) {
        try {
            await dispatch.openings.store(data);
            history.push('/admin/aberturas');
        } catch (e) {
            throw {errors: e.response.data.errors};
        }
    }


    return <div className="container mx-auto">
        <Title>Formulário de abertura</Title>

        <OpeningForm
            onSubmit={createOpening}
        />
    </div>
};
