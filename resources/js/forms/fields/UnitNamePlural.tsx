import {Input} from "@components/form/Input";
import {FieldValues, useController} from "react-hook-form";
import React from "react";
import {FormProps} from "@type/forms";

export const UnitNamePlural = <T extends FieldValues>({name, control}: FormProps<T>) => {
    const {field: {value, onChange}, fieldState: {error}} = useController({
        name: name,
        control: control,
        rules: {
            required: 'Digite o nome da unidade',
        }
    });

    return <Input
        name={name}
        label="Nome da unidade no plural"
        description="Exemplos: pacotes com 12, bandejas, sacos, dúzias, etc"
        error={error}
        inputProps={{
            value: value,
            onChange: onChange
        }}
    />
}
