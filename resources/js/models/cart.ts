import {createModel} from "@rematch/core";
import {RootModel}   from "./index";

export type ItemType = {
    product: number;
    amount: number;
}

export type CartState = {
    items: { [productId: number]: number };
    address_id: number | null;
    delivery: boolean;
};

export const cart = createModel<RootModel>()({
    state: {
        items: {},
        address_id: null,
    } as CartState,

    reducers: {
        setDelivery: (state, payload: boolean) => {
            state.delivery = payload;

            return state;
        },
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
        reset: (state, payload) => {
            return {
                items: {},
                address_id: null,
            } as CartState
        }
    }
});
