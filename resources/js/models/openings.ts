import {createModel}    from "@rematch/core";
import {RootModel}      from "./index";
import {RootState}      from "../store";
import {Timestamps}     from "../types";
import {normalize}      from "normalizr";
import {openingsSchema} from "../schemas";
import {ProductType}    from "./products";

export type OpeningType = OpeningProperties & OpeningComputedProperties & Timestamps;

export type OpeningProperties = {
    enabled_at: string;
    max_delivery_orders: number;
    max_pickup_orders: number;
    opens_at: string;
    closes_at: string;
    delivers_at: string;
}

export type OpeningComputedProperties = {
    id: number;
}

export type OpeningsState = {
    openings: { [id: number]: OpeningType };
    current: number | null;
};

export const openings = createModel<RootModel>()({
    state: {
        openings: {},
        current: null,
    } as OpeningsState,
    reducers: {
        setCurrent: (state, payload: number) => {
            state.current = payload;
            return state;
        },
        addOpening: (state, payload: OpeningType | OpeningType[]) => {
            if (!Array.isArray(payload)) {
                payload = [payload];
            }

            for (let opening of payload) {
                state.openings[opening.id] = opening;
            }

            return state;
        },
    },

    effects: (dispatch) => ({
        async index(payload, state: RootState): Promise<void> {
            const response = await window.axios.get('/openings');

            let normalized = normalize(response.data.data, [openingsSchema]);

            let openings = normalized.entities['openings'] as OpeningType[]; // FIXME: this is an object
            let products = normalized.entities['products'] as ProductType[];

            dispatch.openings.addOpening(Object.values(openings));
            dispatch.products.addProduct(Object.values(products));

            console.log('Trying to figure out current opening! Count:', Object.values(openings).length);

            if (Object.values(openings).length === 1) {
                dispatch.openings.setCurrent(Object.values(openings)[0].id);
            }
        },
    })
});
