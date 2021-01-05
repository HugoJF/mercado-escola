import React from 'react';

export const Container: React.FC = ({children}) => {
    return <div className="absolute w-full h-full mx-auto overflow-x-hidden overflow-y-auto">
        {children}
    </div>
};
