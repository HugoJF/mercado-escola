import React from "react";
import {Input} from "../../form/Input";
import {FieldWrapper} from "../../form/FieldWrapper";

type ProductFormWeightProps = {
    error: any;
    register: any;
}

export const ProductFormWeight: React.FC<ProductFormWeightProps> = ({error, register}) => {
    return <>
        <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
                <Input
                    name=""
                    label="Incremento de peso (em gramas)"
                    description="Múltiplos em que o usuário poderá escolher (ex: 400 irá deixar o usuário selecionar 400g, 800g, 1200g, etc)"
                    error={error}
                />
            </div>

            <div>
                <Input
                    name="quantity_cost"
                    label="Preço por quilograma"
                    error={error}
                    inputProps={{
                        ref: register({required: 'Digite o preço (em R$) de 1 unidade do produto'}),
                        type: 'number',
                        min: 0,
                        step: 0.01,
                    }}
                />
            </div>
        </div>
    </>

};
