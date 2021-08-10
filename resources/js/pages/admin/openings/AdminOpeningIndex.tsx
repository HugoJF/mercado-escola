import React from "react";
import {FlatButton} from "../../../components/ui/FlatButton";
import {Plus} from "react-feather";
import {OpeningType} from "../../../types/openings";
import {Title} from "../../../components/ui/Title";
import {PagePadding} from "../../../containers/PagePadding";
import useNavigation from "../../../hooks/useNavigation";
import {AdminOpeningList} from "./AdminOpeningList";
import isEmpty from "lodash.isempty";
import {Empty} from "../../../components/ui/Empty";

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
            <Title>Aberturas</Title>

            {isEmpty(openings) && <Empty
                title="Nenhuma abertura!"
                description="Nenhuma abertura foi registrada no sistema"
            />}

            <AdminOpeningList
                openings={openings}
                expanded={expanded}
                onClick={onClick}
                onDelete={onDelete}
            />

            <FlatButton
                onClick={bindGo('./novo')}
                text="Adicionar abertura"
                icon={Plus}
            />
        </PagePadding>
    };
