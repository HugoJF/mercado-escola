import React        from 'react';
import {FieldError} from "react-hook-form";

export type FieldWrapperType = {
    name: string,
    label: string,
    error?: FieldError,
}

export const FieldWrapper: React.FC<FieldWrapperType> = ({name, label, error, children}) => {
    return <>
        <label className={`${error ? 'text-red-500' : ' text-gray-500'}`} htmlFor={`#${name}`}>
            {label}
        </label>

        {children}

        {
            error &&
            <p className="text-sm text-red-500 font-medium">{error.message}</p>
        }
    </>
};
