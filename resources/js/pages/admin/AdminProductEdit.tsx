import React, {useEffect, useState} from "react";
import {Loader}              from "react-feather";
import {useDispatch}         from "react-redux";
import {Dispatch}            from "../../store";
import {useProducts}         from "../../selectors";
import {useParams}           from "react-router-dom";
import {useHistory}          from "react-router";
import {useForm}             from "react-hook-form";
import {RegisterCredentials} from "../../models/auth";
import {ProductProperties}   from "../../models/products";
import * as QuantityConfig   from "../../configs/ProductQuantityConfig";
import {Title}               from "../../components/Title";
import {ProductForm}         from "../../forms/ProductForm";

export const AdminProductEdit: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const history = useHistory();
    const params = useParams<{ productId: string }>();
    const products = useProducts();
    const {register, handleSubmit, watch, errors, setError, setValue} = useForm<ProductProperties>();

    const productId = parseInt(params.productId);
    const product = products.products[productId];

    useEffect(() => {
        dispatch.products.index();
    }, []);

    useEffect(() => {
        if (!product) return;

        console.log(product);

        for (let prop of Object.keys(product)) {
            // @ts-ignore
            setValue(prop, product[prop]);
        }
    }, [setValue, product]);

    function setErrors(errors: object) {
        for (let [key, messages] of Object.entries(errors)) {
            // @ts-ignore
            setError(key, {type: 'manual', message: messages[0]});
        }
    }

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
