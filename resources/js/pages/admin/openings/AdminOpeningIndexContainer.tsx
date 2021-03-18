import React                from "react";
import useConfirmMenu       from "../../../hooks/useConfirmMenu";
import {OpeningType}        from "../../../types/openings";
import {AdminOpeningIndex}  from "./AdminOpeningIndex";
import {Loading}            from "../../../components/ui/Loading";
import useToggle            from "../../../hooks/useToggle";
import {useOpenings}        from "../../../queries/useOpenings";
import {useOpeningsDestroy} from "../../../mutations/useOpeningsDestroy";

export const AdminOpeningIndexContainer: React.FC = () => {
    const [expanded, setExpanded] = useToggle();
    const [menu, confirm] = useConfirmMenu();
    const openingsDestroy = useOpeningsDestroy();

    const {status, data, error, isFetching} = useOpenings();

    function handleClick(opening: OpeningType) {
        setExpanded(opening.id);
    }

    async function handleDelete(opening: OpeningType) {
        const confirmed = await confirm({
            title: 'Deletar abertura?',
            description: 'Deletar permanentemente o abertura do sistema',
            action: 'Deletar',
        });

        if (confirmed) {
            openingsDestroy.mutate(opening.id);
        }
    }

    return <>
        {menu}

        {data ?
            <AdminOpeningIndex
                openings={data.data.data}
                expanded={expanded}
                onClick={handleClick}
                onDelete={handleDelete}
            />
            :
            <Loading/>
        }
    </>
};
