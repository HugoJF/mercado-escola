import React                  from "react";
import {FlatButton}           from "../../../components/ui/FlatButton";
import {Plus}                 from "react-feather";
import {AdminOpeningListItem} from "./AdminOpeningListItem";
import {OpeningType}          from "../../../models/openings";
import {Title}                from "../../../components/ui/Title";
import {PagePadding}          from "../../../containers/PagePadding";
import useNavigation          from "../../../hooks/useNavigation";

export type AdminOpeningIndexProps = {
    openings: OpeningType[];
    expanded?: number;
    onClick?: (opening: OpeningType) => void;
    onDelete?: (opening: OpeningType) => void;
}

export const AdminOpeningIndex: React.FC<AdminOpeningIndexProps> =
    ({openings, expanded, onClick, onDelete}) => {
        const {bindGo} = useNavigation();

        return <PagePadding>
            <div className="flex flex-col space-y-4 items-stretch">
                <Title>Aberturas</Title>

                <div className="mt-8">
                    {openings.map(opening => (
                        <AdminOpeningListItem
                            opening={opening}
                            expanded={opening && opening?.id === expanded}
                            onClick={onClick}
                            onDelete={onDelete}
                        />
                    ))}
                </div>

                <FlatButton
                    onClick={bindGo('./novo')}
                    text="Adicionar abertura"
                    icon={Plus}
                />
            </div>
        </PagePadding>
    };
