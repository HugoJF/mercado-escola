import React, {useEffect}  from "react";
import {useDispatch}       from "react-redux";
import {Dispatch}          from "../../store";
import {useProducts}       from "../../selectors";
import {useParams}         from "react-router-dom";
import {useHistory}        from "react-router";
import {ProductProperties} from "../../models/products";
import {Title}             from "../../components/ui/Title";
import {ProductForm}       from "../../components/product/ProductForm";

export const AdminProductEdit: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const history = useHistory();
    const params = useParams<{ productId: string }>();
    const products = useProducts();

    const productId = parseInt(params.productId);
    const product = products.products[productId];

    useEffect(() => {
        dispatch.products.index();
    }, []);

    async function updateProduct(data: ProductProperties) {
        try {
            await dispatch.products.update({id: productId, data: data});
            history.push('/admin/produtos');
        } catch (e) {
            throw {errors: e.response.data.errors};
        }
    }

    // @ts-ignore
    return <div className="mx-auto container">
        <Title>Atualizando {product?.title}</Title>

        <ProductForm
            product={product}
            onSubmit={updateProduct}
        />
    </div>
};
