import {createModel}    from "@rematch/core";
import {RootModel}      from "./index";
import {RootState}      from "../store";
import {Timestamps}     from "../types";
import {normalize}      from "normalizr";
import {openingsSchema} from "../schemas";
import {ProductType}    from "./products";

export type OpeningType = OpeningProperties & OpeningComputedProperties & Timestamps;

export type OpeningProperties = {
    max_delivery_orders: number;
    max_pickup_orders: number;
    opens_at: string;
    closes_at: string;
    delivers_at: string;
}

export type OpeningComputedProperties = {
    id: number;
    products: number[]
    pickup_count: number,
    delivery_count: number,
}

export type OpeningsState = {
    openings: { [id: number]: OpeningType };
    current: number | null;
};

function normalizeOpening(data: object): { openings: OpeningType[], products: ProductType[] } {
    let normalized = normalize(data, openingsSchema);
    let openings: OpeningType[] = [];
    let products: ProductType[] = [];

    if (normalized.entities['openings']) {
        openings = Object.values(normalized.entities['openings'] as object) as OpeningType[];
    }

    if (normalized.entities['products']) {
        products = Object.values(normalized.entities['products'] as object) as ProductType[];
    }

    return {openings, products};
}

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
        remove: (state, payload: number) => {
            delete state.openings[payload];

            return state;
        }
    },

    effects: (dispatch) => ({
        async index(payload, state: RootState): Promise<void> {
            const response = await window.axios.get('/openings');

            let normalized = normalize(response.data.data, [openingsSchema]);

            let openings = normalized.entities['openings'] as OpeningType[]; // FIXME: this is an object
            let products = normalized.entities['products'] as ProductType[];

            dispatch.openings.addOpening(Object.values(openings));
            dispatch.products.addProduct(Object.values(products));

        },
        async current(payload, state: RootState): Promise<void> {
            const response = await window.axios.get('/openings/current');

            const data = response.data.data;

            if (!data) {
                return;
            }

            const {openings, products} = normalizeOpening(data);

            dispatch.openings.addOpening(openings);
            dispatch.products.addProduct(products);

            if (openings.length === 1) {
                dispatch.openings.setCurrent(openings[0].id);
            }

        },
        async store(payload: OpeningProperties, state: RootState): Promise<void> {
            const response = await window.axios.post('/openings', payload);


            const data = response.data.data;

            if (!data) {
                return;
            }

            const {openings, products} = normalizeOpening(data);

            dispatch.openings.addOpening(openings);
            dispatch.products.addProduct(products);
        },
        async update(payload: { id: number, data: OpeningProperties }, state: RootState): Promise<void> {
            const response = await window.axios.patch(`/openings/${payload.id}`, payload.data);

            const openings = response.data;

            if (openings) {
                dispatch.openings.addOpening(Object.values(openings));
            }
        },
        async addProduct(payload: { openingId: number, productId: number }, state: RootState): Promise<void> {
            const response = await window.axios.post(`/openings/${payload.openingId}/products/${payload.productId}`);

            const data = response.data.data;

            if (!data) {
                return;
            }

            const {openings, products} = normalizeOpening(data);

            dispatch.openings.addOpening(openings);
            dispatch.products.addProduct(products);
        },
        async removeProduct(payload: { openingId: number, productId: number }, state: RootState): Promise<void> {
            const response = await window.axios.delete(`/openings/${payload.openingId}/products/${payload.productId}`);

            const data = response.data.data;

            if (!data) {
                return;
            }

            const {openings, products} = normalizeOpening(data);

            dispatch.openings.addOpening(openings);
            dispatch.products.addProduct(products);
        },
        async destroy(payload: number, state: RootState): Promise<void> {
            const response = await window.axios.delete(`/openings/${payload}`);

            dispatch.openings.remove(payload);
        },
    })
});
