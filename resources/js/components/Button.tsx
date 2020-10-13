import React from "react";


export const Button: React.FC = ({children}) => {
    return <button className="transition-all duration-150
            py-3 w-full bg-primary-500 hover:bg-primary-600
            text-white text-center text-xl rounded-lg hover:shadow"
    >
        {children}
    </button>
};
