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
        addProduct: (state, payload: ProductType | ProductType[]) => {
            if (!Array.isArray(payload)) {
                payload = [payload];
            }

            for (let product of payload) {
                state.products[product.id] = product;
            }

            return state;
        },
    },

    effects: (dispatch) => ({
        async index(payload, state: RootState): Promise<void> {
            //
        },
    })
});
