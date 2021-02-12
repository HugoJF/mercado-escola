import React         from "react";
import {Title}       from "../../components/ui/Title";
import {PagePadding} from "../../containers/PagePadding";
import {Empty}       from "../../components/ui/Empty";
import {isEmpty}     from "../../helpers/Functions";
import {OrderType}   from "../../models/orders";
import {OrderList}   from "./OrderList";
import usePagination from "../../hooks/usePagination";
import {Pagination}  from "../../components/ui/Pagination";

export type OrdersIndexProps = {
    orders: OrderType[];
    currentPage: number;
    lastPage: number;
}

export const OrdersIndex: React.FC<OrdersIndexProps> = ({orders, currentPage, lastPage}) => {
    const pagination = usePagination();

    return <PagePadding className="flex flex-col">
        <Title>Meus pedidos</Title>

        {/* Empty warning */}
        {isEmpty(orders) && <div className="flex-grow flex flex-col justify-center">
            <Empty
                title="Nenhum pedido!"
                description="Você ainda não possui nenhum pedido registrado"
            />
        </div>}

        {/* Order list */}
        <OrderList
            orders={orders}
        />

        {!isEmpty(orders) && <Pagination
            current={currentPage}
            onClick={pagination.goToPage}
            last={lastPage}
        />}
    </PagePadding>
};
