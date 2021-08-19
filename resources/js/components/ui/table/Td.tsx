import React from "react";

export const Td: React.FC = ({children}) => {
    return <td className="px-4 py-3 first:text-gray-900 text-gray-600">
        {children}
    </td>
}

