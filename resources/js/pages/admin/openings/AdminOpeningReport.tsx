import React from "react";
import {Title} from "../../../components/ui/Title";
import {PagePadding} from "../../../containers/PagePadding";
import {OpeningReport} from "../../../types/openings";

type AdminOpeningReportProps = {
    report: OpeningReport;
}

export const AdminOpeningReport: React.FC<AdminOpeningReportProps> = ({report}) => {
    return <PagePadding>
        <Title>Relatório da abertura {report.opening.id}</Title>

        <Title sub>Relatório de produtos</Title>

        <table className="w-full rounded-lg overflow-hidden">
            <thead className="bg-gray-200 border-b border-gray-400 rounded-t">
            <tr>
                <th className="px-4 py-2 text-gray-500 text-left font-normal tracking-wider uppercase">Nome</th>
                <th className="px-4 py-2 text-gray-500 text-left font-normal tracking-wider uppercase">Pedidos</th>
                <th className="px-4 py-2 text-gray-500 text-left font-normal tracking-wider uppercase">Quantidade</th>
            </tr>
            </thead>

            <tbody className="bg-white">
            {report.data.map(item => (<tr className="border-b last:border-b-0">
                <td className="px-4 py-2">{item.product.name}</td>
                <td className="px-4 py-2">{item.report.orders} pedidos</td>
                <td className="px-4 py-2">{item.report.total}</td>
            </tr>))}
            </tbody>
        </table>
    </PagePadding>
};
