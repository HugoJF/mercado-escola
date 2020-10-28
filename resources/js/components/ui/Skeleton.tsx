import React      from "react";
import classNames from 'classnames';

export const Skeleton: React.FC<{ className?: string }> = ({className}) => {
    return <span className={classNames(
        className || 'w-1/2',
        'animate-pulse ml-1 h-4 inline-block bg-gray-300 rounded'
    )}/>;
};
