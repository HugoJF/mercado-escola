import React from 'react';
import {FieldError} from "react-hook-form";
import clsx from 'clsx';

export type FieldWrapperProps = {
    name: string;
    label: string;
    description?: string;
    error?: FieldError;
}

export const FieldWrapper: React.FC<FieldWrapperProps> = ({name, label, description, error, children}) => {
    return <>
        <label
            htmlFor={`#${name}`}
            className={clsx(
                'pb-2', {
                    'text-red-500': error,
                    'text-gray-600': !error
                }
            )}
        >
            {label}
        </label>

        {children}

        {
            description &&
            <p className="text-sm text-gray-600">{description}</p>
        }

        {
            error &&
            <p className="text-sm text-red-500 font-medium">{error.message}</p>
        }
    </>
};
