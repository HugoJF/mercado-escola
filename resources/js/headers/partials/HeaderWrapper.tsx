import React from 'react';

export const HeaderWrapper: React.FC = ({children}) => {
    return <div className="py-4 space-y-6 flex-col items-stretch bg-primary-600 text-white shadow-md z-40">
        {children}
    </div>
};
