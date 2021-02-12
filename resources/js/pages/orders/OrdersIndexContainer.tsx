import React, {useState} from "react";
import {Title}           from "../../components/ui/Title";
import useNavigation     from "../../hooks/useNavigation";
import {useQuery}        from "react-query";
import {api}             from "../../api";
import {OrdersIndex}     from "./OrdersIndex";
import {Loading}         from "../../components/ui/Loading";
import usePagination     from "../../hooks/usePagination";

export const OrdersIndexContainer: React.FC = () => {
    const pagination = usePagination();

    const {status, data, error, isFetching} = useQuery(
        ['orders', pagination.page],
        () => api.orders.index(pagination.page)
    );

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
