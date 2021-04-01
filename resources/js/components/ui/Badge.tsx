import React from "react";
import clsx from 'clsx';

export type BadgeColors = 'primary' | 'secondary' | 'warning' | 'info' | 'danger' | 'default';
export type BadgeSizes = 'small' | 'normal';
export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
    color?: BadgeColors;
    size?: BadgeSizes;
};

const colorClasses: { [id in BadgeColors]: string } = {
    primary: 'text-primary-700 border-primary-600',
    secondary: 'text-secondary-700 border-secondary-600',
    warning: 'text-yellow-700 border-yellow-600',
    info: 'text-blue-700 border-blue-600',
    danger: 'text-red-700 border-red-600',
    default: 'text-gray-700 border-gray-600',
};

const sizeClasses: { [id in BadgeSizes]: string } = {
    small: 'py-px px-1 border-2 text-xs font-medium',
    normal: 'py-px px-2 border-2 text-sm font-medium',
};

export const Badge: React.FC<BadgeProps> = ({color = 'primary', size = 'normal', children, ...rest}) => {
    return <span
        {...rest}
        className={clsx(
            colorClasses[color],
            sizeClasses[size],
            'inline-block rounded-lg'
        )}
    >
        {children}
    </span>
};
