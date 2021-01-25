import React      from 'react';
import classNames from 'classnames';

export type PagePaddingProps = {
    className?: string;
}

export const PagePadding: React.FC<PagePaddingProps> = ({className = '', children}) => {
    return <div className={classNames(
        `container mx-auto px-5 py-3 min-h-full`,
        className,
    )}>
        {children}
    </div>
};
