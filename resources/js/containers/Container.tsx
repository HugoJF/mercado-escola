import React      from 'react';
import classNames from 'classnames';

export const Container: React.FC = ({children}) => {
    return <div className="absolute w-full h-full mx-auto overflow-y-auto">
        {children}
    </div>
};
