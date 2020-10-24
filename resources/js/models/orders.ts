import {createModel}             from "@rematch/core";
import {RootModel}               from "./index";
import {RootState}               from "../store";
import {normalize}               from "normalizr";
import {ordersSchema}            from "../schemas";
import {ProductType}             from "./products";
import {SoftDeletes, Timestamps} from "../types";

export type OrderType = OrdersProperties & OrdersComputedProperties & OrderRelationshipProperties & Timestamps & SoftDeletes;

export type OrdersProperties = {
    state: OrderStateEnum;
    opening_id: number;
    address_id: number;
}

export type OrdersComputedProperties = {
    id: string;
    cost: number;
}

export type OrderRelationshipProperties = {
    products: OrderProductsType[];
}

export enum OrderStateEnum {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    READY = 'READY',
    SHIPPING = 'SHIPPING',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
    REJECTED = 'REJECTED',
}

export type OrderProductsType = {
    product_id: number;
    quantity: number;
}

export type OrdersState = {
    orders: { [id: string]: OrderType };
};

export type OrderStore = {
    opening_id: number;
    address_id: number;
    products: OrderProductsType[];
}

export const orders = createModel<RootModel>()({
    state: {
        orders: {}
    } as OrdersState,

    reducers: {
        remove: (state, payload: number) => {
            delete state.orders[payload];

            return state;
        },
        add: (state, payload: OrderType | OrderType[]) => {
            if (!Array.isArray(payload)) {
                payload = [payload];
            }

            for (let order of payload) {
                state.orders[order.id] = order;
            }

            return state;
        },
    },

    effects: (dispatch) => ({
        async index(payload, state: RootState): Promise<void> {
            const response = await window.axios.get('/orders');

            dispatch.orders.add(Object.values(response.data.data));
        },
        async store(payload: OrderStore, state: RootState): Promise<void> {
            const response = await window.axios.post('/orders', payload);

            let normalized = normalize(response.data, [ordersSchema]); // FIXME: there's also `opening`

            let orders = normalized.entities['orders'] as OrderType[];
            let products = normalized.entities['products'] as ProductType[];

            dispatch.orders.add(Object.values(orders));
            dispatch.products.addProduct(Object.values(products));
        },
    })
});
