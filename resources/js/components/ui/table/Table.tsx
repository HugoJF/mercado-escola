import React from "react";

export const Table: React.FC = ({children}) => {
    return <table className="w-full border rounded-lg overflow-hidden shadow">
        {children}
    </table>
}

