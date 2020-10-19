import React from "react";

export const FlatButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({children, ...rest}) => {
    return <button
        {...rest}
        className="transition-all duration-150
            flex justify-center items-center
            w-full px-4 py-5 flex items-center bg-gray-200 hover:bg-gray-300 text-gray-600
            border-b last:border-b-0 border-gray-200 cursor-pointer"
    >
        {children}
    </button>
};
