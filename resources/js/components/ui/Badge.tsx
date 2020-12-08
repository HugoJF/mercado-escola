import React      from "react";
import classNames from 'classnames';

export type BadgeColors = 'primary' | 'secondary' | 'warning' | 'info' | 'danger' | 'default';

export type BadgeProps = {
    color?: BadgeColors;
}

const classes: { [id in BadgeColors]: string } = {
    primary: 'text-primary-700 border-primary-600',
    secondary: 'text-secondary-700 border-secondary-600',
    warning: 'text-yellow-700 border-yellow-600',
    info: 'text-blue-700 border-blue-600',
    danger: 'text-red-700 border-red-600',
    default: 'text-gray-700 border-gray-600',
};

export const Badge: React.FC<BadgeProps & React.HTMLAttributes<HTMLSpanElement>> = ({color = 'primary', children, ...rest}) => {
    return <span
        {...rest}
        className={classNames(
            classes[color],
            'inline-block py-px px-2 border-2 text-sm font-medium rounded-lg'
        )}
    >
        {children}
    </span>
};
