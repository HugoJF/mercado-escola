import React from 'react';

interface ContainerProps {
    padding?: boolean;
}

export const Container: React.FC<ContainerProps> = ({padding = false, children}) => {
    return <div className={`${padding && 'p-5'} absolute top-0 left-0 right-0 bottom-0 mx-auto container overflow-y-auto`}>
        {children}
    </div>
};
