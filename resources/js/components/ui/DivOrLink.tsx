import React from 'react';
import {Link} from "react-router-dom";

export type DivOrLinkProps = React.HTMLAttributes<HTMLDivElement> & {
    to: string;
    isLink: boolean;
}

export const DivOrLink: React.FC<DivOrLinkProps> = ({children, className, to, isLink}) => {
    if (isLink) {
        return <Link className={className} to={to}>
            {children}
        </Link>
    } else {
        return <div className={className}>
            {children}
        </div>
    }
};
