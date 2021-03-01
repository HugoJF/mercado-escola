import React from "react";
import clsx  from 'clsx';

export type BoxProps = React.HTMLAttributes<HTMLDivElement> & {
    hoverable?: boolean,
};

export const Box: React.FC<BoxProps> = (
    {hoverable = true, children, ...rest}
) => {
    return <div
        {...rest}
        className={clsx(
            'transition-colors duration-150 w-full px-1 py-4 flex items-center border-gray-200', {
                'cursor-pointer hover:bg-gray-200': hoverable
            }
        )}
    >
        {children}
    </div>
};
