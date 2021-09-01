import React from "react";
import {Calendar, ShoppingBag} from "react-feather";
import {OpeningType} from "@type/openings";
import {Date} from "@components/ui/Date";
import {FlatButton} from "@components/ui/FlatButton";
import {Stat} from "@components/ui/Stat";
import useNavigation from "@hooks/useNavigation";

type Props = {
    opening: OpeningType;
}

const DEFAULT_FORMAT = "E,  dd 'de' MMMM 'de' yyyy 'às' HH:mm";

export const AdminOpeningViewSummary: React.FC<Props> = ({opening}) => {
    const {opens_at, closes_at, delivers_at} = opening;
    const {bindGo} = useNavigation();

    return <div className="px-4 py-4 space-y-6">
        <Stat title="Data de abertura" icon={Calendar}>
            <Date
                input={opens_at}
                format={DEFAULT_FORMAT}
            />
        </Stat>

        <Stat title="Data de fechamento" icon={Calendar}>
            <Date
                input={closes_at}
                format={DEFAULT_FORMAT}
            />
        </Stat>

        <Stat title="Data de entrega" icon={Calendar}>
            <Date
                input={delivers_at}
                format={DEFAULT_FORMAT}
            />
        </Stat>

        <Stat title="Pedidos para entrega" icon={ShoppingBag}>
            {opening.delivery_count} / {opening.max_delivery_orders}
        </Stat>

        <Stat title="Pedidos para retirada" icon={ShoppingBag}>
            {opening.pickup_count} / {opening.max_pickup_orders}
        </Stat>

        <FlatButton onClick={bindGo(`/admin/aberturas/${opening.id}/relatorio`)}>
            Relatório da abertura
        </FlatButton>
    </div>
};
