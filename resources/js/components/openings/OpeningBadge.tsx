import React from 'react';
import {isFuture, isPast, parseISO} from "date-fns";
import {Badge} from "../ui/Badge";
import {OpeningType} from "@type/openings";

export type OpeningBadgeProps = {
    opening: OpeningType;
}

export const OpeningBadge: React.FC<OpeningBadgeProps> = ({opening}) => {
    const {opens_at, closes_at} = opening;

    const [opensAt, closesAt] = [opens_at, closes_at].map(date => parseISO(date));

    if (isPast(opensAt) && isFuture(closesAt)) {
        return <Badge>Aberto</Badge>;
    }

    if (isPast(opensAt) && isPast(closesAt)) {
        return <Badge color="danger">Fechado</Badge>
    }

    return <Badge color="default">Pendente</Badge>
};
