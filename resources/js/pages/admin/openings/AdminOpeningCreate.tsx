import React from "react";
import {OpeningProperties} from "@type/openings";
import {Title} from "@components/ui/Title";
import {OpeningForm} from "@components/openings/OpeningForm";
import {PagePadding} from "@containers/PagePadding";
import useNavigation from "@hooks/useNavigation";
import {useOpeningsCreate} from "@mutations/useOpeningsCreate";

export const AdminOpeningCreate: React.FC = () => {
    const {go} = useNavigation();
    const openingCreate = useOpeningsCreate();

    async function createOpening(data: OpeningProperties) {
        try {
            await openingCreate.mutateAsync(data);
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
