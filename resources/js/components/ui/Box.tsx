import React      from "react";
import classNames from "classnames";

export type BoxProps = React.HTMLAttributes<HTMLDivElement> & {
    hoverable?: boolean,
};

export const Box: React.FC<BoxProps> = (
    {hoverable = true, children, ...rest}
) => {
    return <div {...rest} className={classNames('transition-colors duration-150 w-full px-2 py-5 flex items-center border-gray-200',
        {
            'cursor-pointer hover:bg-gray-200': hoverable
        })}
    >
        {children}
    </div>
};
