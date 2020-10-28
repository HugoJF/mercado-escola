import React          from 'react';
import {FieldError}   from "react-hook-form";
import {FieldWrapper} from "./FieldWrapper";
import classNames     from 'classnames';

export type TextareaType = {
    name: string,
    label: string,
    textAreaProps?: React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>,
    error?: FieldError,
}

export const Textarea: React.FC<TextareaType> = ({name, label, textAreaProps, error}) => {
    return <FieldWrapper name={name} label={label} error={error}>
        <textarea
            className={classNames(
                `transition-colors duration-300
                block w-full py-3 px-4 text-black
                bg-transparent border-b border-lg`,
                {'border-red-500': error}
            )}
            id={name}
            name={name}
            {...textAreaProps}
        />
    </FieldWrapper>
};
