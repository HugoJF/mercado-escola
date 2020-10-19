import {createModel} from "@rematch/core";
import {RootModel}   from "./index";
import {RootState}   from "../store";

export type ItemType = {
    product: number;
    amount: number;
}

export type CartState = {
    items: { [productId: number]: number };
    address_id: number | null;
};

export const cart = createModel<RootModel>()({
    state: {
        items: {},
        address_id: null,
    } as CartState,

    reducers: {
        setAddress: (state, payload: number) => {
            state.address_id = payload;

            return state;
        },
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
