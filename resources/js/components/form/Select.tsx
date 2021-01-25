import React          from 'react';
import {FieldError}   from "react-hook-form";
import {FieldWrapper} from "./FieldWrapper";
import classNames     from 'classnames';

export type SelectProps = {
    name: string;
    label: string;
    selectProps?: React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;
    error?: FieldError;
}

export const Select: React.FC<SelectProps> = ({name, label, selectProps, error, children}) => {
    return <FieldWrapper name={name} label={label} error={error}>
        <select
            className={classNames(
                `transition-colors duration-300
                block w-full py-3 px-4 text-black
                bg-transparent border-b border-lg`,
                {'border-red-500': error}
            )}
            id={name}
            name={name}
            {...selectProps}
        >
            {children}
        </select>
    </FieldWrapper>
};
