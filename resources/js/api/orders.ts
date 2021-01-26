import {bxios}            from "../bxios";
import {ResourceResponse}      from "../types";
import {OrderStore, OrderType} from "../models/orders";

export const orders = {
    index: () => bxios()
        .get('orders')
        .send<ResourceResponse<OrderType[]>>(),
    create: (data: OrderStore) => bxios()
        .post('orders')
        .body(data)
        .send<ResourceResponse<OrderType>>(),
};
