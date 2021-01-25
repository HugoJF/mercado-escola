import React        from 'react';
import {FieldError} from "react-hook-form";
import classNames   from 'classnames';

export type FieldWrapperProps = {
    name: string;
    label: string;
    error?: FieldError;
}

export const FieldWrapper: React.FC<FieldWrapperProps> = ({name, label, error, children}) => {
    return <>
        <label
            className={classNames('pb-2', {
                'text-red-500': error,
                'text-gray-600': !error
            })}
            htmlFor={`#${name}`}
        >
            {label}
        </label>

        {children}

        {
            error &&
            <p className="text-sm text-red-500 font-medium">{error.message}</p>
        }
    </>
};
