import React from "react";

type ButtonColors = 'primary' | 'secondary';

export type ButtonProps = {
    color?: ButtonColors;
}

const classes: { [id in ButtonColors]: string } = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white',
    secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white'
};

export const Button: React.FC<ButtonProps & React.HTMLAttributes<HTMLButtonElement>> = ({color = 'primary', children, ...rest}) => {
    return <button
        {...rest}
        className={`transition-all duration-150
            py-3 w-full ${classes[color]} text-center text-xl rounded-lg hover:shadow`}
    >
        {children}
    </button>
};
