import React    from "react";
import {Loader} from "react-feather";
import clsx     from 'clsx';

type ButtonColors = 'default' | 'primary' | 'secondary' | 'danger';

export type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
    className?: string;
    enabled?: boolean;
    color?: ButtonColors;
    outline?: boolean;
    loading?: boolean;
}

const classes: { [id in ButtonColors]: (params: ButtonProps) => string } = {
    default: ({enabled, outline}) => `${outline ? 'text-gray-500 border-2 border-gray-500' : 'bg-gray-500 hover:bg-gray-600 text-white'}`,
    primary: ({enabled, outline}) => 'bg-primary-500 hover:bg-primary-600 text-white',
    secondary: ({enabled, outline}) => 'bg-secondary-500 hover:bg-secondary-600 text-white',
    danger: ({enabled, outline}) => `${outline ? 'text-red-500 border-2 border-red-500' : 'bg-red-500 hover:bg-red-600 text-white'}`
};

export const Button: React.FC<ButtonProps> = (props) => {
    const {enabled = true, loading = false, color = 'primary', outline, className, children, ...rest} = props;

    return <button
        disabled={!enabled}
        {...rest}
        className={clsx(
            className,
            classes[color](props),
            'transition-all duration-150 py-3 px-4 text-center text-xl',
            'font-medium rounded-lg border-box hover:shadow', {
                'cursor-not-allowed opacity-50': !enabled
            }
        )}
    >
        {loading ?
            <Loader size={30} className="animate-spin mx-auto block"/>
            :
            children
        }
    </button>
};
