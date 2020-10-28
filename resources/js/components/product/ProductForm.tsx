import React, {useEffect, useState}     from "react";
import {useForm}                        from "react-hook-form";
import * as QuantityConfig              from "../../configs/ProductQuantityConfig";
import {ProductProperties, ProductType} from "../../models/products";
import {Input}                          from "../form/Input";
import {Textarea}                       from "../form/Textarea";
import {Select}                         from "../form/Select";
import {Button}                         from "../ui/Button";

type ProductFormType = {
    product?: ProductType;
    onSubmit: (data: ProductProperties) => void;
}

export const ProductForm: React.FC<ProductFormType>
    = ({onSubmit, product}) => {
    const [loading, setLoading] = useState(false);
    const {register, handleSubmit, errors, setError, setValue} = useForm<ProductProperties>();

    useEffect(() => {
        if (!product) return;

        for (let prop of Object.keys(product)) {
            // @ts-ignore
            setValue(prop, product[prop]);
        }
    }, [setValue, product?.id]);

    function setErrors(errors: object) {
        for (let [key, messages] of Object.entries(errors)) {
            // @ts-ignore
            setError(key, {type: 'manual', message: messages[0]});
        }
    }

    async function submit(data: ProductProperties) {
        setLoading(true);
        try {
            await onSubmit(data);
        } catch (e) {
            // TODO: type check this
            setErrors(e.errors);
        }
        setLoading(false);
    }

    // @ts-ignore
    return <form onSubmit={handleSubmit(submit)}>
        <div>
            {/* Title */}
            <div className="mb-8">
                <Input
                    name="title"
                    label="Nome"
                    error={errors.title}
                    inputProps={{
                        ref: register({required: 'Digite o nome do produto'}),
                        placeholder: "Digite o nome do produto...",
                    }}/>
            </div>

            {/* Description */}
            <div className="mb-8">
                <Textarea
                    name="description"
                    label="Descrição"
                    error={errors.description}
                    textAreaProps={{
                        ref: register({required: 'Digite a descrição do produto'}),
                    }}
                />
            </div>

            {/* Quantity type */}
            <div className="mb-8">
                <Select
                    name="quantity_type"
                    label="Tipo da quantidade"
                    error={errors.quantity_type}
                    selectProps={{
                        ref: register({required: 'Selecione qual o tipo de unidade do produto'})
                    }}
                >
                    {Object.entries(QuantityConfig).map(
                        ([id, definition]) => (
                            <option key={id} value={id}>{definition.singular}</option>
                        )
                    )}
                </Select>
            </div>

            {/* Quantity cost */}
            <div className="mb-8">
                <Input
                    name="quantity_cost"
                    label="Preço da quantidade (em centavos)"
                    error={errors.quantity_cost}
                    inputProps={{
                        ref: register({required: 'Digite o preço (em R$) de 1 unidade do produto'}),
                        type: 'number',
                        min: 0,
                        step: 1,
                    }}
                />
            </div>

            <Button loading={loading}>
                Atualizar
            </Button>
        </div>
    </form>
};
