import React from "react";
import {Archive, Icon} from "react-feather";

type EmptyProps = {
    icon?: Icon;
    title: string;
    description?: string;
    iconSize?: number;
}

export const Empty: React.FC<EmptyProps> = ({icon: EmptyIcon = Archive, iconSize = 64, title, description}) => {
    return <div className="flex flex-col h-full justify-center items-center">
        <EmptyIcon size={iconSize} className="text-gray-400"/>

        <h2 className="mt-4 text-lg">
            {title}
        </h2>

        {description && <p className="mt-2 text-center text-sm text-gray-400 tracking-tight">
            {description}
        </p>}
    </div>
};
