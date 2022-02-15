import {createModel} from "@rematch/core";
import {RootModel} from "./index";

export type AddressState = {
    address?: string;
    number?: number;
    complement?: string;
};

export const address = createModel<RootModel>()({
    state: {} as AddressState,
    reducers: {
        setAddress: (state, payload: string) => ({
            ...state,
            address: payload
        }),
        setNumber: (state, payload: number) => ({
            ...state,
            number: payload
        }),
        setComplement: (state, payload: string) => ({
            ...state,
            complement: payload
        }),
    },
});
