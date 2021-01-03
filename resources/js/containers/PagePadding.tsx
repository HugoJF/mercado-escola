import React      from 'react';
import classNames from 'classnames';

interface PagePaddingProps {
    className?: string,
}

export const PagePadding: React.FC<PagePaddingProps> = ({className = '', children}) => {
    return <div className={classNames(
        `container mx-auto px-5 py-3`,
        className,
    )}>
        {children}
    </div>
};
