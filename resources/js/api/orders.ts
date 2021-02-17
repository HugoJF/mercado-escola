import {bxios}                                       from "../bxios";
import {PaginatedResourceResponse, ResourceResponse} from "../types";
import {OrderStore, OrderType}                       from "../types/orders";
import {OpeningType}                                 from "../types/openings";
import {ProductType}                                 from "../types/products";
import {AddressType}                                 from "../types/addresses";

export type OrderProductPivot = {
    pivot: {
        order_id: string;
        product_id: number;
        quantity: number;
        quantity_cost: number;
    }
}

export type OrderWithAddress = { address?: AddressType };
export type OrderWithOpening = { opening: OpeningType };
export type OrderWithProducts = { products: ProductType<OrderProductPivot>[] };

export const orders = {
    index: (page = 1) => bxios()
        .get('orders')
        .setCustom({params: {page}})
        .send<PaginatedResourceResponse<OrderType<OrderWithAddress & OrderWithOpening & OrderWithProducts>[]>>(),
    create: (data: OrderStore) => bxios()
        .post('orders')
        .body(data)
        .send<ResourceResponse<OrderType>>(),
    show: (id: string) => bxios()
        .get('orders', id)
        .send<ResourceResponse<OrderType<OrderWithAddress & OrderWithOpening & OrderWithProducts>>>(),
    cancel: (order: OrderType) => bxios()
        .patch('orders', order.id, 'cancel')
        .send<ResourceResponse<OrderType>>(),
};
