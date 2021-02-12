import {bxios}                                       from "../bxios";
import {PaginatedResourceResponse, ResourceResponse} from "../types";
import {OrderStore, OrderType}                       from "../models/orders";

export const orders = {
    index: (page = 1) => bxios()
        .get('orders')
        .setCustom({params: {page}})
        .send<PaginatedResourceResponse<OrderType[]>>(),
    create: (data: OrderStore) => bxios()
        .post('orders')
        .body(data)
        .send<ResourceResponse<OrderType>>(),
    cancel: (order: OrderType) => bxios()
        .patch('orders', order.id, 'cancel')
        .send<ResourceResponse<OrderType>>(),
};
