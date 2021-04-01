import React from "react";
import {Title} from "../../../components/ui/Title";
import {ProductForm} from "../../../components/products/ProductForm";
import {PagePadding} from "../../../containers/PagePadding";
import useNavigation from "../../../hooks/useNavigation";
import {useProductCreate} from "../../../mutations/useProductCreate";

export const AdminProductCreate: React.FC = () => {
    const {go} = useNavigation();
    const productCreate = useProductCreate();

    async function updateProduct(data: FormData) {
        try {
            await productCreate.mutateAsync(data);
            go('/admin/produtos');
        } catch (e) {
            throw {errors: e.response.data.errors};
        }
    }

    return <PagePadding>
        <Title>Criando produto</Title>

        <ProductForm
            onSubmit={updateProduct}
            action="Criar"
        />
    </PagePadding>
};
