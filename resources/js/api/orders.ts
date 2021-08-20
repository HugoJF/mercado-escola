import {bxios} from "~/bxios";
import {PaginatedResourceResponse, ResourceResponse} from "~/types";
import {OrdersProperties, OrderType, OrderWithAddress, OrderWithOpening, OrderWithProducts} from "@type/orders";

export const orders = {
    index: (page = 1) => bxios()
        .get('orders')
        .setCustom({params: {page}})
        .send<PaginatedResourceResponse<OrderType<OrderWithAddress & OrderWithOpening & OrderWithProducts>[]>>(),
    create: () => bxios()
        .post('orders')
        .send<ResourceResponse<OrderType>>(),
    show: (id: Id) => bxios()
        .get('orders', id)
        .send<ResourceResponse<OrderType<OrderWithAddress & OrderWithOpening & OrderWithProducts>>>(),
    update: (id: Id, data: Partial<OrdersProperties>) => bxios()
        .patch('orders', id)
        .body(data)
        .send<ResourceResponse<OrderType<OrderWithAddress & OrderWithOpening & OrderWithProducts>>>(),
    cancel: (order: OrderType) => bxios()
        .patch('orders', order.id, 'cancel')
        .send<ResourceResponse<OrderType>>(),
};
