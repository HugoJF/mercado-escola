import React from "react";
import {Input} from "../../form/Input";
import {Controller, DeepMap, FieldError} from "react-hook-form";
import {ProductProperties} from "../../../types/products";

type ProductFormWeightProps = {
    errors: DeepMap<ProductProperties, FieldError>;
    register: any;
    control: any;
}

export const ProductFormWeight: React.FC<ProductFormWeightProps> = ({errors, control, register}) => {
    return <>
        <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
                <Input
                    name="weight_increment"
                    label="Incremento de peso (em gramas)"
                    description="Múltiplos em que o usuário poderá escolher (ex: 400 irá deixar o usuário selecionar 400g, 800g, 1200g, etc)"
                    error={errors.weight_increment}
                    inputProps={{
                        ref: register,
                    }}
                />
            </div>

            <div>
                <Controller
                    name="quantity_cost"
                    rules={{required: 'Digite o preço (em R$) de 1 unidade do produto'}}
                    control={control}
                    render={({onChange, value}) => <Input
                        name="quantity_cost"
                        label="Preço por quilograma"
                        error={errors.quantity_cost}
                        inputProps={{
                            type: 'number',
                            min: 0,
                            step: 0.01,
                            // TODO: replace . with , to avoid problems with decimal separators
                            onChange: val => onChange(parseFloat(val.currentTarget.value ?? '0') * 100),
                            value: value / 100,
                        }}
                    />}
                />
            </div>

        </div>
    </>

};
