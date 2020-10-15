import {createModel}             from "@rematch/core";
import {RootModel}               from "./index";
import {RootState}               from "../store";
import {SoftDeletes, Timestamps} from "../types";

export type AddressType = AddressProperties & AddressComputedProperties & Timestamps & SoftDeletes;

export type AddressProperties = {
    address: string;
    number: number;
    complement?: string;
}

export type AddressComputedProperties = {
    user_id: number;
}

export type AddressesState = {
    addresses: AddressType[];
    failed: boolean;
};

export const addresses = createModel<RootModel>()({
    state: {
        addresses: [],
        loading: false,
        failed: false,
    } as AddressesState,
    reducers: {
        setFailed: (state, payload: boolean) => {
            state.failed = payload;
            return state;
        },
        setAddresses: (state, payload: object) => {
            state.addresses = payload as AddressType[];
            return state;
        },
    },

    effects: (dispatch) => ({
        async index(payload, state: RootState): Promise<void> {
            try {
                const response = await window.axios.get('/addresses');

                dispatch.addresses.setAddresses(response.data);
            } catch (e) {
                dispatch.addresses.setFailed(true);
            }
        },
        async store(payload: AddressProperties, state: RootState): Promise<void> {
            try {
                await window.axios.post('/addresses', payload);

                await dispatch.addresses.index();
            } catch (e) {
                dispatch.addresses.setFailed(true);
            }
        },
    })
});
