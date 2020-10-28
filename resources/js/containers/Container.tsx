import React      from 'react';
import classNames from 'classnames';

interface ContainerProps {
    padding?: boolean;
}

export const Container: React.FC<ContainerProps> = ({padding = false, children}) => {
    return <div className={classNames(
        `absolute top-0 left-0 right-0 bottom-0 mx-auto overflow-y-auto`,
        {
            'p-5': padding,
        }
    )}>
        {children}
    </div>
};
