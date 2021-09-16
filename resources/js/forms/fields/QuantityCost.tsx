import {isValidNumber, parseNumber} from "~/helpers/Functions";
import {Input} from "@components/form/Input";
import {FieldValues, useController} from "react-hook-form";
import React from "react";
import {FormProps} from "@type/forms";

type Props = {
    label: string;
}

export const QuantityCost = <T extends FieldValues>({name, control, label}: Props & FormProps<T>) => {
    const {field: {value, onChange}, fieldState: {error}} = useController({
        name: name,
        control: control,
        rules: {
            required: 'Digite um valor',
            validate: {
                validNumber: value => isValidNumber(value.toString()) || 'Número inválido',
            },
        }
    });

    return <Input
        name={name}
        label={label}
        error={error}
        inputProps={{
            type: 'number',
            min: 0,
            step: 0.01,
            onChange: event => onChange(event.currentTarget.value),
            onBlur: () => isValidNumber(value) && onChange(parseNumber(+value)),
            value: value
        }}
    />
};
