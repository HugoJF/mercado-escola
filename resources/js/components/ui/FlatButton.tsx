import React from "react";

export const FlatButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({children, ...rest}) => {
    return <button
        {...rest}
        className="transition-all duration-150
            flex justify-center items-center
            w-full px-3 py-4 flex items-center hover:bg-gray-200 text-gray-600
            border-2 border-gray-400 border-dashed cursor-pointer rounded-lg"
    >
        {children}
    </button>
};
