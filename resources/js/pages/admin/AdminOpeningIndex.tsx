import React, {useState}      from "react";
import {FlatButton}           from "../../components/ui/FlatButton";
import {Plus}                 from "react-feather";
import {useHistory}           from "react-router";
import useRelativePath        from "../../hooks/useRelativePath";
import {Dispatch}             from "../../store";
import {useDispatch}          from "react-redux";
import {useOpenings}          from "../../selectors";
import useConfirmMenu         from "../../hooks/useConfirmMenu";
import {AdminOpeningListItem} from "./AdminOpeningListItem";
import {OpeningType}          from "../../models/openings";
import {Title}                from "../../components/ui/Title";
import {PagePadding}          from "../../containers/PagePadding";
import useLoadEffect          from "../../hooks/useLoadEffect";

export const AdminOpeningIndex: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const history = useHistory();
    const relative = useRelativePath();
    const openings = useOpenings();
    const [open, setOpen] = useState<number | null>(null);
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
        const result = await confirm({
            title: 'Deletar abertura?',
            description: 'Deletar permanentemente o abertura do sistema',
            action: 'Deletar',
        });

        if (result) {
            dispatch.openings.destroy(opening.id);
        }
    }

    return <PagePadding>
        <div className="flex flex-col space-y-4 items-stretch">

            {menu}

            <Title>Aberturas</Title>

            <div className="mt-8">
                {getOpenings().map(opening => (
                    <AdminOpeningListItem
                        opening={opening}
                        open={open === opening?.id}
                        onClick={(opening) => setOpen(open === opening.id ? null : opening.id)}
                        onDelete={handleDelete}
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
