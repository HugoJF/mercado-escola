import React from 'react';
import clsx from 'clsx';

export type PagePaddingProps = {
    className?: string;
}

export const PagePadding: React.FC<PagePaddingProps> = ({className = '', children}) => {
    return <div
        className={clsx(
            'container mx-auto px-5 py-3 min-h-full',
            className,
        )}
    >
        {children}
    </div>
};
