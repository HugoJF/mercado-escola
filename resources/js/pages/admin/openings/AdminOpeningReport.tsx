import React from "react";
import {Title} from "@components/ui/Title";
import {PagePadding} from "@containers/PagePadding";
import {OpeningReport} from "@type/openings";
import {Table} from "@components/ui/table/Table";
import {Thead} from "@components/ui/table/Thead";
import {Tr} from "@components/ui/table/Tr";
import {Tbody} from "@components/ui/table/Tbody";
import {Td} from "@components/ui/table/Td";
import {Th} from "@components/ui/table/Th";

type AdminOpeningReportProps = {
    report: OpeningReport;
}

export const AdminOpeningReport: React.FC<AdminOpeningReportProps> = ({report}) => {
    return <PagePadding>
        <Title>Relatório de produtos da abertura {report.opening.id}</Title>

        <Table>
            <Thead>
                <Th>Nome</Th>
                <Th>Pedidos</Th>
                <Th>Quantidade</Th>
            </Thead>

            <Tbody>
                {report.data.map(item => (<Tr>
                    <Td>{item.product.name}</Td>
                    <Td>{item.report.orders} pedidos</Td>
                    <Td>{item.report.total}</Td>
                </Tr>))}
            </Tbody>
        </Table>
    </PagePadding>
};
