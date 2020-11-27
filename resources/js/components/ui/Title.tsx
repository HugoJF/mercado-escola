import React from 'react';

export const Title: React.FC = ({children}) => {
    return <h2 className="text-xl tracking-wide">
        {children}
    </h2>;
};
