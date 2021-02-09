import React         from "react";
import {useDispatch} from "react-redux";
import {Dispatch}    from "../../../store";
import {Title}       from "../../../components/ui/Title";
import {ProductForm} from "../../../components/products/ProductForm";
import {PagePadding} from "../../../containers/PagePadding";
import useNavigation from "../../../hooks/useNavigation";

export const AdminProductCreate: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const {go} = useNavigation();

    async function updateProduct(data: FormData) {
        try {
            await dispatch.products.create(data);
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
