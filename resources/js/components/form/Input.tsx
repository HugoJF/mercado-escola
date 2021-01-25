import React          from 'react';
import {FieldError}   from "react-hook-form";
import {FieldWrapper} from "./FieldWrapper";
import classNames     from 'classnames';

export type InputProps = {
    name: string;
    label: string;
    inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    error?: FieldError;
}

export const Input: React.FC<InputProps> = ({name, label, inputProps, error}) => {
    return <FieldWrapper name={name} label={label} error={error}>
        <input
            className={classNames(
                `transition-colors duration-300
                block w-full py-3 px-4 text-black placeholder-gray-400
                bg-transparent border-b border-lg`,
                {'border-red-500': error}
            )}
            id={name}
            name={name}
            {...inputProps}
        />
    </FieldWrapper>
};
