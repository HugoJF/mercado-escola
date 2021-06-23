import React from 'react';
import {FieldError} from "react-hook-form";
import {FieldWrapper} from "./FieldWrapper";
import clsx from 'clsx';

export type InputProps = {
    name: string;
    label: string;
    description?: string;
    inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    error?: FieldError;
    disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({name, label, description, disabled = false, inputProps, error}) => {
    return <FieldWrapper name={name} label={label} description={description} error={error}>
        <input
            className={clsx(
                'transition-colors duration-300',
                'block w-full py-3 px-4 placeholder-gray-400',
                'border-b border-lg rounded-lg', {
                    'border-red-500': error,
                    'bg-gray-300 text-gray-500': disabled,
                    'bg-white text-black': !disabled,
                },
            )}
            id={name}
            name={name}
            {...inputProps}
        />
    </FieldWrapper>
};
