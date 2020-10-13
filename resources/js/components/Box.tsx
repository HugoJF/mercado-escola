import React from "react";

export const Box: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
    {children, ...rest}
) => {
    return <div {...rest} className="transition-colors duration-150
        w-full px-4 py-5 flex items-center hover:bg-gray-200
        border-b last:border-b-0 border-gray-200 cursor-pointer"
    >
        {children}
    </div>
};
