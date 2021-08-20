import React from "react";
import {OpeningType} from "@type/openings";
import {AdminOpeningListItem} from "./AdminOpeningListItem";

export type AdminOpeningListProps = {
    openings: OpeningType[];
    expanded?: number;
    onClick?: (opening: OpeningType) => void;
    onDelete?: (opening: OpeningType) => void;
}

export const AdminOpeningList: React.FC<AdminOpeningListProps>
    = ({openings, expanded = false, onClick, onDelete}) => {
    return <div className="divide-y divide-gray-200">
        {openings.map(opening => (
            <AdminOpeningListItem
                key={opening.id}
                opening={opening}
                expanded={opening && opening?.id === expanded}
                onClick={onClick}
                onDelete={onDelete}
            />
        ))}
    </div>

};
