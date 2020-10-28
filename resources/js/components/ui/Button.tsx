import React      from "react";
import {Loader}   from "react-feather";
import classNames from 'classnames';

type ButtonColors = 'default' | 'primary' | 'secondary' | 'danger';

export type ButtonProps = {
    color?: ButtonColors;
    outline?: boolean;
    loading?: boolean;
}

const classes: { [id in ButtonColors]: (params: ButtonProps) => string } = {
    default: ({outline}) => `${outline ? 'text-gray-500 border-2 border-gray-500' : 'bg-gray-500 hover:bg-gray-600 text-white'}`,
    primary: ({outline}) => 'bg-primary-500 hover:bg-primary-600 text-white',
    secondary: ({outline}) => 'bg-secondary-500 hover:bg-secondary-600 text-white',
    danger: ({outline}) => `${outline ? 'text-red-500 border-2 border-red-500' : 'bg-red-500 hover:bg-red-600 text-white'}`
};

export const Button: React.FC<ButtonProps & React.HTMLAttributes<HTMLButtonElement>> = (props) => {
    const {loading = false, color = 'primary', outline, children, ...rest} = props;

    return <button
        {...rest}
        className={classNames(
            classes[color](props),
            `transition-all duration-150 py-3 w-full
            text-center text-xl font-medium rounded-lg border-box hover:shadow`
        )}
    >
        {loading ?
            <Loader size={30} className="animate-spin mx-auto block"/>
            :
            children
        }
    </button>
};
