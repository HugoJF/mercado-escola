import {Input} from "@components/form/Input";
import {FieldValues, useController} from "react-hook-form";
import React from "react";
import {FormProps} from "@type/forms";

export const ProductName = <T extends FieldValues>({name, control}: FormProps<T>) => {
    const {field: {value, onChange}, fieldState: {error}} = useController({
        name: name,
        control: control,
        rules: {
            required: 'Digite o nome do produto...',
        }
    });

    return <Input
        name="name"
        label="Nome"
        error={error}
        inputProps={{
            value: value,
            onChange: onChange,
            placeholder: "Digite o nome do produto..."
        }}
    />
};
