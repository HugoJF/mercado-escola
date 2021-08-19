import React from "react";

export const Thead: React.FC = ({children}) => {
    return <thead className="bg-gray-200 border-b border-gray-400 rounded-t">
    <tr>
        {children}
    </tr>
    </thead>
}

