import React, {useEffect, useState}     from "react";
import {Loader}                         from "react-feather";
import {useDispatch}                    from "react-redux";
import {useHistory}                     from "react-router";
import {useForm}                        from "react-hook-form";
import * as QuantityConfig              from "../configs/ProductQuantityConfig";
import {ProductProperties, ProductType} from "../models/products";
import {Dispatch}                       from "../store";

type ProductForm = {
    product?: ProductType;
    onSubmit: (data: ProductProperties) => void;
}

export const ProductForm: React.FC<ProductForm>
    = ({onSubmit, product}) => {
    const dispatch = useDispatch<Dispatch>();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const {register, handleSubmit, watch, errors, setError, setValue} = useForm<ProductProperties>();

    useEffect(() => {
        if (!product) return;

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

    function submit(data: ProductProperties) {
        setLoading(true);
        try {
            onSubmit(data);
        } catch (e) {
            // TODO: type check this
            setErrors(e.errors);
        }
        setLoading(false);
    }

    // @ts-ignore
    return <form className="block" onSubmit={handleSubmit(submit)}>
        <div>
            {/* Title */}
            <div className="mb-8">
                <label className={`${errors.title ? 'text-red-500' : ' text-gray-500'}`} htmlFor="#title">Nome</label>
                <input
                    className={`transition-colors duration-300
                        block w-full py-3 px-4 text-black
                        bg-transparent border-b border-lg${errors.title ? ' border-red-500' : ''}`}
                    placeholder="Digite o nome do produto..."
                    id="title"
                    ref={register({required: 'Digite o nome do produto'})}
                    name="title"
                    type="text"
                />

                {
                    errors.title &&
                    <p className="text-sm text-red-500 font-medium">{errors.title.message}</p>
                }
            </div>

            {/* Description */}
            <div className="mb-8">
                <label className={`${errors.description ? 'text-red-500' : ' text-gray-500'}`} htmlFor="#description">Descrição</label>
                <textarea
                    className={`transition-colors duration-300
                        block w-full py-3 px-4 text-black
                        bg-transparent border-b border-lg${errors.description ? ' border-red-500' : ''}`}
                    placeholder="Digite a descrição do produto..."
                    id="description"
                    ref={register({required: 'Digite a descrição do produto'})}
                    name="description"
                />

                {
                    errors.description &&
                    <p className="text-sm text-red-500 font-medium">{errors.description.message}</p>
                }
            </div>

            {/* Quantity type */}
            <div className="mb-8">
                <label className={`${errors.quantity_type ? 'text-red-500' : ' text-gray-500'}`} htmlFor="#quantity_type">Tipo da quantidade</label>
                <select
                    className={`transition-colors duration-300
                        block w-full py-3 px-4 text-black
                        bg-transparent border-b border-lg${errors.quantity_type ? ' border-red-500' : ''}`}
                    placeholder="Selecione qual o tipo de unidade do produto..."
                    id="quantity_type"
                    ref={register({required: 'Selecione qual o tipo de unidade do produto'})}
                    name="quantity_type"
                >
                    {Object.entries(QuantityConfig).map(([id, definition]) => (
                        <option key={id} value={id}>{definition.singular}</option>
                    ))}
                </select>
                {
                    errors.quantity_type &&
                    <p className="text-sm text-red-500 font-medium">{errors.quantity_type.message}</p>
                }
            </div>

            {/* Quantity cost */}
            <div className="mb-8">
                <label className={`${errors.quantity_cost ? 'text-red-500' : ' text-gray-500'}`} htmlFor="#quantity_cost">Preço da quantidade (em centavos)</label>
                <input
                    className={`transition-colors duration-300
                        block w-full py-3 px-4 text-black
                        bg-transparent border-b border-lg${errors.quantity_cost ? ' border-red-500' : ''}`}
                    placeholder="Digite o preço (em R$) de 1 unidade do produto..."
                    id="quantity_cost"
                    ref={register({required: 'Digite o preço (em R$) de 1 unidade do produto'})}
                    name="quantity_cost"
                    type="number"
                    min={0}
                    step={1}
                />

                {
                    errors.quantity_cost &&
                    <p className="text-sm text-red-500 font-medium">{errors.quantity_cost.message}</p>
                }
            </div>

            <button className="w-full mt-8 py-4 bg-primary-500 text-center text-xl text-white font-medium rounded-lg">
                {loading ?
                    <Loader className="animate-spin mx-auto block"/>
                    :
                    <span>Atualizar</span>
                }
            </button>
        </div>
    </form>
};
