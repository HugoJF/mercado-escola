import React from 'react';

export const Container: React.FC = ({children}) => {
    return <div className="absolute top-0 left-0 right-0 mx-auto container px-4 pt-8">
            {children}
    </div>
};
