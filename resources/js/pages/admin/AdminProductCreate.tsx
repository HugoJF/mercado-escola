import React               from "react";
import {useDispatch}       from "react-redux";
import {Dispatch}          from "../../store";
import {useHistory}        from "react-router";
import {ProductProperties} from "../../models/products";
import {Title}             from "../../components/ui/Title";
import {ProductForm}       from "../../components/product/ProductForm";

export const AdminProductCreate: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const history = useHistory();

    async function updateProduct(data: FormData) {
        try {
            await dispatch.products.create(data);
            history.push('/admin/produtos');
        } catch (e) {
            throw {errors: e.response.data.errors};
        }
    }

    return <div className="mx-auto container">
        <Title>Criando produto</Title>

        <ProductForm
            onSubmit={updateProduct}
        />
    </div>
};
