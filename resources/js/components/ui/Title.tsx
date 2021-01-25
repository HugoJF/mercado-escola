import React from 'react';

export type TitleProps = {
    sub?: boolean;
}

export const Title: React.FC<TitleProps> = ({sub = false, children}) => {
    const Element = sub ? 'p' : 'h2';
    const className = sub ? 'text-sm text-gray-600' : 'text-xl tracking-wide';

    return <Element className={className}>
        {children}
    </Element>;
};
