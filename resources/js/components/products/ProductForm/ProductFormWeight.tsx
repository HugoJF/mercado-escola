import React from "react";
import {Input} from "../../form/Input";
import {Controller, DeepMap, FieldError} from "react-hook-form";
import {ProductProperties} from "@type/products";
import {isValidNumber, parseNumber} from "~/helpers/Functions";

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
                        ...register('weight_increment'),
                        type: 'number',
                        min: 0,
                        step: 0.001,
                    }}
                />
            </div>

            <div>
                <Controller
                    name="quantity_cost"
                    rules={{required: 'Digite o preço (em R$) de 1 unidade do produto'}}
                    control={control}
                    render={({field: {value, onChange}}) => <Input
                        name="quantity_cost"
                        label="Preço por quilograma"
                        error={errors.quantity_cost}
                        inputProps={{
                            type: 'number',
                            min: 0,
                            step: 0.01,
                            onChange: event => onChange(event.currentTarget.value),
                            onBlur: event => isValidNumber(value) && onChange(parseNumber(value)),
                            value: value,
                        }}
                    />}
                />
            </div>

        </div>
    </>

};
