import React from "react";
import {Title} from "../../../components/ui/Title";
import {OpeningProperties, OpeningType} from "../../../types/openings";
import {OpeningForm} from "../../../components/openings/OpeningForm";
import {PagePadding} from "../../../containers/PagePadding";

export type AdminOpeningEditProps = {
    opening: OpeningType;
    onSubmit: (data: OpeningProperties) => void;
}

export const AdminOpeningEdit: React.FC<AdminOpeningEditProps> = ({opening, onSubmit}) => {
    return <PagePadding>
        <Title>Atualizando {opening.id}</Title>

        <OpeningForm
            opening={opening}
            onSubmit={onSubmit}
            action="Atualizar"
        />
    </PagePadding>
};
