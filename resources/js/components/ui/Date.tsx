import React, {useMemo} from "react";
import {format as f, parseISO} from "date-fns";
import {ptBR} from "date-fns/locale";

type DateProps = {
    input: string;
    format: string;
}

export const Date: React.FC<DateProps> = ({input, format}) => {
    const date = useMemo(() => {
        return parseISO(input);
    }, [input]);

    return <>{f(date, format, {
        locale: ptBR
    })}</>
};
