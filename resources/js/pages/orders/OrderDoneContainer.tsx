import React, {useEffect}                     from "react";
import {useDispatch}                          from "react-redux";
import {Dispatch}                             from "../../store";
import {useParams}                            from "react-router";
import {useAddresses, useOpenings, useOrders} from "../../selectors";
import {OrderDone}                            from "./OrderDone";
import {Loading}                              from "../../components/ui/Loading";

export const OrderDoneContainer: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const params = useParams<{ orderId: string }>();
    const orders = useOrders();
    const openings = useOpenings();
    const addresses = useAddresses();

    useEffect(() => {
        dispatch.orders.index();
        dispatch.openings.index();
        dispatch.addresses.index();
    }, []);

    const order = orders.orders[params.orderId];
    const opening = openings.openings[order?.opening_id];
    const address = addresses.addresses[order?.address_id];

    const pendingData = !order || !opening || (!address && order?.address_id);

    return <Loading loading={pendingData}>
        <OrderDone
            order={order}
            opening={opening}
            address={address}
        />
    </Loading>
};
