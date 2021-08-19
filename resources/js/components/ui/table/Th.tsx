import React from "react";

export const Th: React.FC = ({children}) => {
    return <th className="px-4 py-3 text-gray-600 text-left text-base font-normal tracking-wider uppercase">
        {children}
    </th>
}

