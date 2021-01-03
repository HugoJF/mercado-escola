import React  from 'react';
import {Link} from "react-router-dom";

interface DivOrLinkProps {
    to: string;
    isLink: boolean;
}

export const DivOrLink: React.FC<React.HTMLAttributes<HTMLDivElement> & DivOrLinkProps> = ({children, className, to, isLink, ...rest}) => {
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
