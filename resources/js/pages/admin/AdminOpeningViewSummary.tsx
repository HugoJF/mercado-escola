import React         from "react";
import {Calendar}    from "react-feather";
import {OpeningType} from "../../models/openings";

interface AdminOpeningViewSummary {
    opening: OpeningType;
}

export const AdminOpeningViewSummary: React.FC<AdminOpeningViewSummary> = ({opening}) => {
    return <div className="px-4 py-4 space-y-6">
        <div className="flex items-center space-x-4">
            <Calendar className="text-gray-400"/>
            <div className="space-y-1">
                <h2 className="text-gray-700 text-lg">Data de abertura</h2>
                <p className="text-gray-400">8h30 - 22/09/2020</p>
            </div>
        </div>

        <div className="flex items-center space-x-4">
            <Calendar className="text-gray-400"/>
            <div className="space-y-1">
                <h2 className="text-gray-700 text-lg">Data de fechamento</h2>
                <p className="text-gray-400">20h30 - 29/09/2020</p>
            </div>
        </div>

        <div className="flex items-center space-x-4">
            <Calendar className="text-gray-400"/>
            <div className="space-y-1">
                <h2 className="text-gray-700 text-lg">Data de entrega</h2>
                <p className="text-gray-400">12h00 - 30/09/2020</p>
            </div>
        </div>
    </div>
};
