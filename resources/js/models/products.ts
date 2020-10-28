import {createModel}             from "@rematch/core";
import {RootModel}               from "./index";
import {RootState}               from "../store";
import {SoftDeletes, Timestamps} from "../types";

export type ProductType = ProductProperties & ProductComputedProperties & Timestamps & SoftDeletes;

export type ProductProperties = {
    title: string;
    description: string;
    quantity_type: string;
    quantity_cost: number;
}

export type ProductComputedProperties = {
    id: number;
}

export type ProductsState = {
    products: { [id: number]: ProductType };
};

export const products = createModel<RootModel>()({
    state: {
        products: {},
    } as ProductsState,

    reducers: {
        reset: (state, payload) => {
            state.products = {};

            return state;
        },
        addProduct: (state, payload: ProductType | ProductType[]) => {
            if (!Array.isArray(payload)) {
                payload = [payload];
            }

            for (let product of payload) {
                state.products[product.id] = product;
            }

            return state;
        },
        remove: (state, payload: number) => {
            delete state.products[payload];

            return state;
        }
    },

    effects: (dispatch) => ({
        async index(payload, state: RootState): Promise<void> {
            const response = await window.axios.get('/products');

            let favoritesProducts = response.data as ProductType[];

            dispatch.products.reset();
            dispatch.products.addProduct(favoritesProducts);
        },
        async update(payload: {id: number, data: ProductProperties}, state: RootState): Promise<void> {
            const response = await window.axios.patch(`/products/${payload.id}`, payload.data);

            dispatch.products.addProduct(response.data);
        },
        async destroy(payload: number, state: RootState): Promise<void> {
            const response = await window.axios.delete(`/products/${payload}`);

            dispatch.products.remove(payload);
        }
    })
});
