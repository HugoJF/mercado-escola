import React    from "react";
import {Loader} from "react-feather";

type ButtonColors = 'primary' | 'secondary';

export type ButtonProps = {
    color?: ButtonColors;
    loading?: boolean;
}

const classes: { [id in ButtonColors]: string } = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white',
    secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white'
};

export const Button: React.FC<ButtonProps & React.HTMLAttributes<HTMLButtonElement>> = ({loading = false, color = 'primary', children, ...rest}) => {
    return <button
        {...rest}
        className={`transition-all duration-150
            py-3 w-full ${classes[color]} text-center text-xl rounded-lg hover:shadow`}
    >
        {loading ?
            <Loader size={30} className="animate-spin mx-auto block"/>
            :
            children
        }
    </button>
};
