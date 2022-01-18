import {FieldValues, useController} from "react-hook-form";
import React from "react";
import {FormProps} from "@type/forms";
import {Textarea} from "@components/form/Textarea";

export const ProductDescription = <T extends FieldValues>({name, control}: FormProps<T>) => {
    const {field: {value, onChange}, fieldState: {error}} = useController({
        name: name,
        control: control,
        rules: {
            required: 'Digite o nome do produto...',
        }
    });

    return <Textarea
        name="description"
        label="Descrição"
        error={error}
        textAreaProps={{
            value: value,
            onChange: onChange,
        }}
    />
};
