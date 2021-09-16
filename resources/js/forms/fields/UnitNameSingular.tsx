import {Input} from "@components/form/Input";
import {FieldValues, useController} from "react-hook-form";
import React from "react";
import {FormProps} from "@type/forms";

export const UnitNameSingular = <T extends FieldValues>({name, control}: FormProps<T>) => {
    const {field: {value, onChange}, fieldState: {error}} = useController({
        name: name,
        control: control,
        rules: {
            required: 'Digite um valor',
        }
    });

    return <Input
        name={name}
        label="Nome da unidade no singular"
        description="Exemplos: pacote de 12, bandeja, saco, dúzia, etc"
        error={error}
        inputProps={{
            value: value,
            onChange: onChange
        }}
    />
};
