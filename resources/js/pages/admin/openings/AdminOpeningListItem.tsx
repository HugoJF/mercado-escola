import {HeightTransitioner} from "../../../components/ui/HeightTransitioner";
import {Calendar, Trash}    from "react-feather";
import {Link}               from "react-router-dom";
import React                from "react";
import {OpeningType}        from "../../../models/openings";
import useRelativePath      from "../../../hooks/useRelativePath";
import {format, parseISO}   from "date-fns";
import {Box}                from "../../../components/ui/Box";
import {RotatingArrowRight} from "../../../components/ui/RotatingArrowRight";
import {OpeningBadge}       from "../../../components/openings/OpeningBadge";

export type AdminOpeningListItemProps = {
    opening: OpeningType;
    expanded: boolean;
    onClick?: (opening: OpeningType) => void;
    onDelete?: (opening: OpeningType) => void;
}

export const AdminOpeningListItem: React.FC<AdminOpeningListItemProps>
    = ({opening, expanded = false, onClick, onDelete}) => {
    const relative = useRelativePath();

    const opensAt = opening && parseISO(opening.opens_at);
    const closesAt = opening && parseISO(opening.closes_at);

    function handleClick() {
        if (onClick) {
            onClick(opening)
        }
    }

    function handleDelete() {
        if (onDelete) {
            onDelete(opening);
        }
    }

    return <Box
        hoverable={false}
    >
        <HeightTransitioner>
            {/* Product details */}
            <div
                onClick={handleClick}
                className="flex items-center"
            >
                <div className="flex items-center justify-center w-6 mr-4">
                    <Calendar className="text-primary-500"/>
                </div>

                <div className="flex-grow">
                    {/* Header with ID and status */}
                    <div className="flex justify-between">
                        <h3 className="flex text-lg font-medium">Abertura {opening.id}</h3>
                        <OpeningBadge opening={opening}/>
                    </div>

                    {/* Opens at and closes at */}
                    <div className="my-2 flex items-center">
                        <span className="text-gray-700 tracking-tight">
                            {format(opensAt, 'dd MMM yy')}
                        </span>
                        <span className="mx-4 border-b-2 border-gray-200 border-dashed flex-grow"/>
                        <span className="text-gray-700 tracking-tight">
                            {format(closesAt, 'dd MMM yy')}
                        </span>
                    </div>

                    {/* Stats */}
                    <ul className="flex items-center justify-center text-sm text-gray-500 tracking-tight">
                        {/* Order datetime */}
                        <li className="text-center">
                            {opening.delivery_count}
                            /
                            {opening.max_delivery_orders}{' '}
                            entregas
                        </li>

                        {/* Separator */}
                        <span className="mx-2 font-bold text-gray-300">·</span>

                        {/* Order cost */}
                        <li className="text-center">
                            {opening.pickup_count}
                            /
                            {opening.max_pickup_orders}{' '}
                            retiradas
                        </li>

                        {/* Separator */}
                        <span className="mx-2 font-bold text-gray-300">·</span>

                        {/* Product quantity */}
                        <li className="text-center">
                            {opening.products.length} produtos
                        </li>
                    </ul>
                </div>

                <RotatingArrowRight rotated={expanded}/>
            </div>

            {/* Reveal menu */}
            {/* This empty div is needed to avoid full unmount causing HeightTransitioner to be unable to animate */}
            <div>
                {expanded && <div className="mt-4 flex divide-x divide-gray-200">
                    {/* View */}
                    <Link
                        to={relative(`/${opening.id}`)}
                        className="flex justify-center flex-grow items-center py-2 px-5 text-gray-700 font-medium"
                    >
                        Ver
                    </Link>

                    {/* Delete */}
                    <div
                        onClick={handleDelete}
                        className="flex justify-center flex-grow items-center py-2 px-4 text-red-600 font-medium"
                    >
                        <Trash size={20} className="mr-1 inline"/>
                        Deletar
                    </div>

                    {/* Edit */}
                    <Link
                        to={relative(`/${opening.id}/editar`)}
                        className="flex justify-center flex-grow items-center py-2 px-5 text-gray-700 font-medium"
                    >
                        Editar
                    </Link>
                </div>}
            </div>
        </HeightTransitioner>
    </Box>

};
