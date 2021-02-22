import React        from "react";
import {ArrowRight} from "react-feather";
import clsx         from 'clsx';


export type LoadingProps = {
    rotated?: boolean;
}

export const RotatingArrowRight: React.FC<LoadingProps> = ({rotated = false}) => {
    return <ArrowRight className={clsx(
        'transform transition-transform duration-150 ml-2 flex-shrink-0', {
            'rotate-90 text-gray-500': rotated,
            'text-gray-300': !rotated,
        },
    )}
    />
};
