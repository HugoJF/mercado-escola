import React from 'react';
import {FieldError} from "react-hook-form";
import {FieldWrapper} from "./FieldWrapper";
import clsx from 'clsx';

export type InputProps = {
    name: string;
    label: string;
    inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    error?: FieldError;
    disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({name, label, disabled = false, inputProps, error}) => {
    return <FieldWrapper name={name} label={label} error={error}>
        <input
            className={clsx(
                'transition-colors duration-300',
                'block w-full py-3 px-4 placeholder-gray-400',
                'border-b border-lg', {
                    'border-red-500': error,
                    'bg-gray-300 text-gray-500 rounded': disabled,
                    'bg-transparent text-black': !disabled,
                },
            )}
            id={name}
            name={name}
            {...inputProps}
        />
    </FieldWrapper>
};
