import React from "react";
import {Input} from "../../form/Input";
import {Controller, DeepMap, FieldError} from "react-hook-form";
import {ProductProperties} from "../../../types/products";

type ProductFormUnitProps = {
    errors: DeepMap<ProductProperties, FieldError>;
    register: any;
    control: any,
}

export const ProductFormUnit: React.FC<ProductFormUnitProps> = ({errors, control, register}) => {
    return <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
            <Input
                name="unit_name_singular"
                label="Nome da unidade no singular"
                description="Exemplos: pacote de 12, bandeja, saco, dúzia, etc"
                error={errors.unit_name_singular}
                inputProps={{
                    ref: register,
                }}
            />
        </div>

        <div>
            <Input
                name="unit_name_plural"
                label="Nome da unidade no plural"
                description="Exemplos: pacotes com 12, bandejas, sacos, dúzias, etc"
                error={errors.unit_name_plural}
                inputProps={{
                    ref: register
                }}
            />
        </div>

        <div>
            <Controller
                name="quantity_cost"
                control={control}
                render={({value, onChange}) => <Input
                    name="quantity_cost"
                    label="Preço da unidade"
                    error={errors.quantity_cost}
                    inputProps={{
                        type: 'number',
                        min: 0,
                        step: 0.01,
                        // TODO: replace . with , to avoid problems with decimal separators
                        onChange: e => onChange(parseFloat(e.currentTarget.value ?? '0') * 100),
                        value: value / 100
                    }}
                />}
            />
        </div>
    </div>
};
