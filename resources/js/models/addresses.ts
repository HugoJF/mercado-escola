import {createModel}             from "@rematch/core";
import {RootModel}               from "./index";
import {RootState}               from "../store";
import {SoftDeletes, Timestamps} from "../types";
import {api}                     from "../api";

export type AddressType = AddressProperties & AddressComputedProperties & Timestamps & SoftDeletes;

export type AddressProperties = {
    address: string;
    number: number;
    latitude: number;
    longitude: number;
    complement?: string;
}

export type AddressComputedProperties = {
    id: number;
    user_id: number;
}

export type AddressesState = {
    addresses: {[id: number]: AddressType};
    failed: boolean;
};

export const addresses = createModel<RootModel>()({
    state: {
        addresses: {},
        failed: false,
    } as AddressesState,
    reducers: {
        setFailed: (state, payload: boolean) => {
            state.failed = payload;
            return state;
        },
        setAddresses: (state, payload: AddressType|AddressType[]) => {
            if (!Array.isArray(payload)) {
                payload = [payload];
            }

            for (let address of payload) {
                state.addresses[address.id] = address;
            }

            return state;
        },
    },

    effects: (dispatch) => ({
        async index(payload, state: RootState): Promise<void> {
            try {
                const response = await api.addresses.index();

                dispatch.addresses.setAddresses(response.data);
            } catch (e) {
                dispatch.addresses.setFailed(true);
            }
        },
        async store(payload: AddressProperties, state: RootState): Promise<void> {
            try {
                await api.addresses.store(payload);

                await dispatch.addresses.index();
            } catch (e) {
                dispatch.addresses.setFailed(true);
            }
        },
    })
});
