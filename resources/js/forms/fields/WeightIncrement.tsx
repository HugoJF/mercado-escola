import {Input} from "@components/form/Input";
import {FieldValues, useController} from "react-hook-form";
import React from "react";
import {FormProps} from "@type/forms";

export const WeightIncrement = <T extends FieldValues>({name, control}: FormProps<T>) => {
    const {field: {value, onChange}, fieldState: {error}} = useController({
        name: name,
        control: control,
    });

    return <Input
        name="weight_increment"
        label="Incremento de peso"
        description="Múltiplos em que o usuário poderá escolher (ex: 1.5 irá deixar o usuário selecionar 1.5kg, 3kg, 4.5kg, etc)"
        error={error}
        inputProps={{
            value: value,
            onChange: onChange,
            type: 'number',
            min: 0,
            step: 0.001,
        }}
    />
};
