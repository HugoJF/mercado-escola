import React from "react";
import {OrdersIndex} from "./OrdersIndex";
import {Loading} from "../../components/ui/Loading";
import usePagination from "../../hooks/usePagination";
import {useOrders} from "../../queries/useOrders";

export const OrdersIndexContainer: React.FC = () => {
    const pagination = usePagination();

    const {status, data, error, isFetching} = useOrders(pagination.page);

    return <>
        {data ?
            <OrdersIndex
                orders={data.data.data}
                currentPage={data.data.meta.current_page}
                lastPage={data.data.meta.last_page}
            />
            :
            <Loading/>
        }
    </>
};
