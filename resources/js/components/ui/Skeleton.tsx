import React from "react";
import clsx from 'clsx';

export type SkeletonProps = {
    className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({className}) => {
    return <span
        className={clsx(
            className ?? 'w-1/2',
            'animate-pulse ml-1 h-4 inline-block bg-gray-300 rounded'
        )}
    />;
};
