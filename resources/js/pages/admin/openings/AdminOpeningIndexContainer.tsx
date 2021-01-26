import React, {useState}   from "react";
import {Dispatch}          from "../../../store";
import {useDispatch}       from "react-redux";
import {useOpenings}       from "../../../selectors";
import useConfirmMenu      from "../../../hooks/useConfirmMenu";
import {OpeningType}       from "../../../models/openings";
import useLoadEffect       from "../../../hooks/useLoadEffect";
import {AdminOpeningIndex} from "./AdminOpeningIndex";

export const AdminOpeningIndexContainer: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const openings = useOpenings();
    const [expanded, setExpanded] = useState<number | undefined>(undefined);
    const [menu, confirm] = useConfirmMenu();

    const loading = useLoadEffect(async () => {
        await dispatch.openings.index();
    }, []);

    function getOpenings(): any[] {
        if (loading) {
            return Array(4).fill(null);
        } else {
            return Object.values(openings.openings);
        }
    }

    async function handleDelete(opening: OpeningType) {
        const confirmed = await confirm({
            title: 'Deletar abertura?',
            description: 'Deletar permanentemente o abertura do sistema',
            action: 'Deletar',
        });

        if (confirmed) {
            dispatch.openings.destroy(opening.id);
        }
    }

    return <>
        {menu}

        <AdminOpeningIndex
            openings={getOpenings()}
            expandedOpening={expanded}
            onClick={(opening) => setExpanded(opening.id)}
            onDelete={handleDelete}
        />
    </>
};
