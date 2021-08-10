import React from 'react';
import InputMask from "react-input-mask";
import {Controller} from "react-hook-form";

type Props = {
    id: string;
    className: string;
    name: string;
    control: any;
}

export const PhoneInput: React.FC<Props> = ({id, className, name, control}) => {
    return <Controller
        name={name}
        control={control}
        render={({field: {value, onChange}}) => <InputMask
            id={id}
            className={className}
            value={value}
            onChange={(e) => onChange(e.currentTarget.value)}
            mask="(67) 9 9999 9999"
        />}
    />
};
