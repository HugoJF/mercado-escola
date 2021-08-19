import React from "react";

export const Tr: React.FC = ({children}) => {
    return <tr className="border-b last:border-b-0">
        {children}
    </tr>
}

