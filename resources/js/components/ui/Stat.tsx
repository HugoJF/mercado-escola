import React from "react";
import {Icon} from "react-feather";

export type StatProps = {
    title: string;
    icon: Icon;
}

export const Stat: React.FC<StatProps> = (props) => {
    const {title, icon: Icon, children} = props;

    return <div className="flex items-center space-x-4">
        <Icon className="text-gray-400"/>
        <div className="space-y-1">
            <h2 className="text-gray-700 text-lg">{title}</h2>
            <p className="text-gray-400">
                {children}
            </p>
        </div>
    </div>
};
