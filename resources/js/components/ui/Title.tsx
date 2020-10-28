import React from 'react';

export const Title: React.FC = ({children}) => {
    return <h2 className="text-2xl tracking-wider">
        {children}
    </h2>;
};
