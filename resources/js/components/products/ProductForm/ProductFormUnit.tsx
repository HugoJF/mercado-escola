import React from "react";
import {Input} from "../../form/Input";

type ProductFormUnitProps = {
    error: any;
    register: any;
}

export const ProductFormUnit: React.FC<ProductFormUnitProps> = ({error, register}) => {
    return <>
        <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
                <Input
                    name=""
                    label="Descrição da unidade"
                    description="Exemplos: pacote com 12, bandeja, saco, dúzia, etc"
                    error={error}
                />
            </div>

            <div>
                <Input
                    name="quantity_cost"
                    label="Preço da unidade"
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
