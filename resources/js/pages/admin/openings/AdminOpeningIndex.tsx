import React                  from "react";
import {FlatButton}           from "../../../components/ui/FlatButton";
import {Plus}                 from "react-feather";
import {useHistory}           from "react-router";
import useRelativePath        from "../../../hooks/useRelativePath";
import {AdminOpeningListItem} from "./AdminOpeningListItem";
import {OpeningType}          from "../../../models/openings";
import {Title}                from "../../../components/ui/Title";
import {PagePadding}          from "../../../containers/PagePadding";

export type AdminOpeningIndexProps = {
    openings: OpeningType[];
    expandedOpening?: number;
    onClick?: (opening: OpeningType) => void;
    onDelete?: (opening: OpeningType) => void;
}

export const AdminOpeningIndex: React.FC<AdminOpeningIndexProps> =
    ({openings, expandedOpening, onClick, onDelete}) => {
        const relative = useRelativePath();
        const history = useHistory();

        return <PagePadding>
            <div className="flex flex-col space-y-4 items-stretch">
                <Title>Aberturas</Title>

                <div className="mt-8">
                    {openings.map(opening => (
                        <AdminOpeningListItem
                            opening={opening}
                            open={opening && opening?.id === expandedOpening}
                            onClick={onClick}
                            onDelete={onDelete}
                        />
                    ))}
                </div>

                <FlatButton
                    onClick={() => history.push(relative('/novo'))}
                >
                    <Plus className="text-gray-500"/>
                    <span className="ml-2 text-gray-500 text-lg font-medium">Adicionar abertura</span>
                </FlatButton>
            </div>
        </PagePadding>
    };
