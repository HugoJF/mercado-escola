import React from 'react';

export const Container: React.FC = ({children}) => {
    return <div className="absolute p-4 top-0 left-0 right-0 mx-auto container">
        {children}
    </div>
};
