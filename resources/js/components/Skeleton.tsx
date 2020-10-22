import React from "react";

export const Skeleton: React.FC<{ className?: string, randomSize?: boolean }> = ({className}) => {
    return <span className={`${className} animate-pulse ml-1 h-4 inline-block bg-gray-300 rounded`}/>;
};
