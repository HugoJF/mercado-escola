import React, {useEffect}  from "react";
import {useDispatch}       from "react-redux";
import {Dispatch}          from "../../store";
import {useProducts}       from "../../selectors";
import {useParams}         from "react-router-dom";
import {useHistory}        from "react-router";
import {useForm}           from "react-hook-form";
import {ProductProperties} from "../../models/products";
import {Title}       from "../../components/ui/Title";
import {ProductForm} from "../../components/product/ProductForm";

export const AdminProductCreate: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const history = useHistory();

    async function updateProduct(data: ProductProperties) {
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
