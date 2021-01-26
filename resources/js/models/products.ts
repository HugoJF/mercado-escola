import {createModel}             from "@rematch/core";
import {RootModel}               from "./index";
import {RootState}               from "../store";
import {SoftDeletes, Timestamps} from "../types";
import {QuantityTypes}           from "../components/ui/QuantityTypeText";
import {api}                     from "../api";

export type ProductType = ProductProperties & ProductComputedProperties & Timestamps & SoftDeletes;

export type ProductProperties = {
    name: string;
    description: string;
    quantity_type: QuantityTypes;
    quantity_cost: number;
}

export type ProductComputedProperties = {
    id: number;
    media: {[id: number]: string};
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
            const response = await api.products.index();

            dispatch.products.reset();
            dispatch.products.addProduct(response.data.data);
        },

        async create(payload: FormData, state: RootState): Promise<void> {
            const response = await api.products.create(payload);

            dispatch.products.addProduct(response.data.data);
        },

        async update(payload: { id: number, data: FormData }, state: RootState): Promise<void> {
            const response = await api.products.update(payload.id, payload.data);

            dispatch.products.addProduct(response.data.data);
        },

        async destroy(payload: number, state: RootState): Promise<void> {
            const response = await api.products.destroy(payload);

            dispatch.products.remove(payload);
        },

        async destroyMedia(payload: {productId: number, mediaId: number}, state: RootState): Promise<void> {
            const response = await window.axios.delete(`/products/${payload.productId}/media/${payload.mediaId}`);

            dispatch.products.addProduct(response.data.data);
        }
    })
});
