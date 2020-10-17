import {createModel} from "@rematch/core";
import {RootModel}   from "./index";
import {RootState}   from "../store";

export type ItemType = {
    product: number;
    amount: number;
}

export type CartState = {
    items: {[productId: number]: number};
};

export const cart = createModel<RootModel>()({
    state: {
        items: {},
    } as CartState,

    reducers: {
        add: (state, payload: ItemType) => {
            state.items[payload.product] = payload.amount;

            return state;
        },
        remove: (state, payload: number) => {
            delete state.items[payload];

            return state;
        },
    },

    effects: (dispatch) => ({
        async index(payload, state: RootState): Promise<void> {
            //
        },
    })
});
