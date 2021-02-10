import React, {useState}   from "react";
import {Dispatch}          from "../../../store";
import {useDispatch}       from "react-redux";
import useConfirmMenu      from "../../../hooks/useConfirmMenu";
import {OpeningType}       from "../../../models/openings";
import {AdminOpeningIndex} from "./AdminOpeningIndex";
import {useQuery}          from "react-query";
import {api}               from "../../../api";
import {Loading}           from "../../../components/ui/Loading";
import useToggle           from "../../../hooks/useToggle";

export const AdminOpeningIndexContainer: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const [expanded, setExpanded] = useToggle();
    const [menu, confirm] = useConfirmMenu();

    const {status, data, error, isFetching} = useQuery('openings', api.openings.index);

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
            dispatch.openings.destroy(opening.id);
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
