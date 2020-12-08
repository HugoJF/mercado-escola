import React      from 'react';
import classNames from 'classnames';

interface ContainerProps {
    padding?: boolean;
}

export const Container: React.FC<ContainerProps> = ({children}) => {
    return <div className="absolute w-full h-full mx-auto overflow-y-auto">
        {children}
    </div>
};
