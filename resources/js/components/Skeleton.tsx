import React from "react";

export const Skeleton: React.FC<{ className?: string}> = ({className}) => {
    return <span className={`${className || 'w-1/2'} animate-pulse ml-1 h-4 inline-block bg-gray-300 rounded`}/>;
};
