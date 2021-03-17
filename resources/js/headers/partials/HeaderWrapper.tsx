import React from 'react';

export const HeaderWrapper: React.FC = ({children}) => {
    return <div className="flex-col items-stretch bg-primary-600 text-white shadow-md z-40">
        {children}
    </div>
};
