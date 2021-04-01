import React from "react";
import {Calendar, ShoppingBag} from "react-feather";
import {OpeningType} from "../../../types/openings";
import {Date} from "../../../components/ui/Date";

export type AdminOpeningViewSummaryProps = {
    opening: OpeningType;
}

const DEFAULT_FORMAT = "E,  dd 'de' MMMM 'de' yyyy 'às' HH:mm";

export const AdminOpeningViewSummary: React.FC<AdminOpeningViewSummaryProps> = ({opening}) => {
    const {opens_at, closes_at, delivers_at} = opening;

    return <div className="px-4 py-4 space-y-6">
        <div className="flex items-center space-x-4">
            <Calendar className="text-gray-400"/>
            <div className="space-y-1">
                <h2 className="text-gray-700 text-lg">Data de abertura</h2>
                <p className="text-gray-400">
                    <Date
                        input={opens_at}
                        format={DEFAULT_FORMAT}
                    />
                </p>
            </div>
        </div>

        <div className="flex items-center space-x-4">
            <Calendar className="text-gray-400"/>
            <div className="space-y-1">
                <h2 className="text-gray-700 text-lg">Data de fechamento</h2>
                <p className="text-gray-400">
                    <Date
                        input={closes_at}
                        format={DEFAULT_FORMAT}
                    />
                </p>
            </div>
        </div>

        <div className="flex items-center space-x-4">
            <Calendar className="text-gray-400"/>
            <div className="space-y-1">
                <h2 className="text-gray-700 text-lg">Data de entrega</h2>
                <p className="text-gray-400">
                    <Date
                        input={delivers_at}
                        format={DEFAULT_FORMAT}
                    />
                </p>
            </div>
        </div>

        <div className="flex items-center space-x-4">
            <ShoppingBag className="text-gray-400"/>
            <div className="space-y-1">
                <h2 className="text-gray-700 text-lg">Pedidos para entrega</h2>
                <p className="text-gray-400">
                    {opening.delivery_count} / {opening.max_delivery_orders}
                </p>
            </div>
        </div>

        <div className="flex items-center space-x-4">
            <ShoppingBag className="text-gray-400"/>
            <div className="space-y-1">
                <h2 className="text-gray-700 text-lg">Data para retirada</h2>
                <p className="text-gray-400">
                    {opening.pickup_count} / {opening.max_pickup_orders}
                </p>
            </div>
        </div>

        {/*<FlatButton>Mais informações</FlatButton>*/}
    </div>
};
