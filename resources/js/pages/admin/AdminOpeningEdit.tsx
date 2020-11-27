import React, {useEffect}         from "react";
import {useDispatch}              from "react-redux";
import {Dispatch}                 from "../../store";
import {useOpenings, useProducts} from "../../selectors";
import {useParams}                from "react-router-dom";
import {useHistory}               from "react-router";
import {ProductProperties}        from "../../models/products";
import {Title}                    from "../../components/ui/Title";
import {ProductForm}              from "../../components/product/ProductForm";
import {OpeningProperties}        from "../../models/openings";
import {OpeningForm}              from "../../components/openings/OpeningForm";

export const AdminOpeningEdit: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const history = useHistory();
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
            history.push('/admin/aberturas');
        } catch (e) {
            if (e.response.data.errors)  {
                throw {errors: e.response.data.errors};
            } else {
                throw e;
            }
        }
    }

    // @ts-ignore
    return <div className="mx-auto container">
        <Title>Atualizando {opening?.id}</Title>

        <OpeningForm
            opening={opening}
            onSubmit={updateOpening}
        />
    </div>
};
