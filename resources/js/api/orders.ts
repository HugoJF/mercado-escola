import {bxios}                                       from "../bxios";
import {PaginatedResourceResponse, ResourceResponse}                                  from "../types";
import {OrderStore, OrderType, OrderWithAddress, OrderWithOpening, OrderWithProducts} from "../types/orders";
import {OpeningType}                                                                  from "../types/openings";
import {ProductType}                                 from "../types/products";
import {AddressType}                                 from "../types/addresses";

export const orders = {
    index: (page = 1) => bxios()
        .get('orders')
        .setCustom({params: {page}})
        .send<PaginatedResourceResponse<OrderType<OrderWithAddress & OrderWithOpening & OrderWithProducts>[]>>(),
    create: (data: OrderStore) => bxios()
        .post('orders')
        .body(data)
        .send<ResourceResponse<OrderType>>(),
    show: (id: Id) => bxios()
        .get('orders', id)
        .send<ResourceResponse<OrderType<OrderWithAddress & OrderWithOpening & OrderWithProducts>>>(),
    cancel: (order: OrderType) => bxios()
        .patch('orders', order.id, 'cancel')
        .send<ResourceResponse<OrderType>>(),
};
