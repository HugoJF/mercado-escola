import React from "react";

export const Error: React.FC = ({children}) => {
    return <div className="flex items-center space-x-3 w-full my-4 px-3 py-3 text-white text-center bg-red-500 font-medium rounded-lg">
        <span className="flex flex-shrink-0 items-center justify-center mr-3 w-8 h-8 text-red-500 text-lg font-bold bg-white rounded-full">!</span>
        {children}
    </div>
};
