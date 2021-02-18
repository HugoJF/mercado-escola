import {createModel}    from "@rematch/core";
import {RootModel}      from "./index";
import {RootState}         from "../store";
import {Pivot, Timestamps} from "../types";
import {normalize}         from "normalizr";
import {openingsSchema} from "../schemas";
import {ProductType}    from "./products";
import {api}            from "../api";
import {OrderType}      from "./orders";

export type OpeningWithProducts = { products: ProductType<PivotOpeningProduct>[] };
export type PivotOpeningProduct = Pivot<{
    opening_id: number;
    product_id: number;
}>

export type OpeningType<T = {}> = T
    & OpeningProperties
    & OpeningComputedProperties
    & OpeningRelationshipProperties
    & Timestamps;

export type OpeningProperties = {
    max_delivery_orders: number;
    max_pickup_orders: number;
    opens_at: string;
    closes_at: string;
    delivers_at: string;
}

export type OpeningComputedProperties = {
    id: number;
    products: number[];
    pickup_count: number;
    delivery_count: number;
}

export type OpeningRelationshipProperties = {
    products: ProductType[];
    orders: OrderType[];
}

export type OpeningsState = {
    openings: { [id: number]: OpeningType };
    current: number | null;
};

function normalizeOpening(data: object, collection: boolean = false): { openings: OpeningType[], products: ProductType[] } {
    const schema = collection ? [openingsSchema] : openingsSchema;
    const normalized = normalize(data, schema);

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
            const response = await api.openings.index();

            const data = response.data.data;

            if (!data) {
                return;
            }

            const {openings, products} = normalizeOpening(data, true);

            dispatch.openings.addOpening(openings);
            dispatch.products.addProduct(products);
        },
        async current(payload, state: RootState): Promise<void> {
            const response = await api.openings.current();

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
            const response = await api.openings.store(payload);

            const data = response.data.data;

            if (!data) {
                return;
            }

            const {openings, products} = normalizeOpening(data);

            dispatch.openings.addOpening(openings);
            dispatch.products.addProduct(products);
        },
        async update(payload: { id: number, data: OpeningProperties }, state: RootState): Promise<void> {
            const response = await api.openings.update(payload.id, payload.data);

            const data = response.data.data;

            if (!data) {
                return;
            }

            const {openings} = normalizeOpening(data);

            dispatch.openings.addOpening(openings);
        },
        async addProduct(payload: { openingId: number, productId: number }, state: RootState): Promise<void> {
            const response = await api.openings.addProduct(payload.openingId, payload.productId);

            const data = response.data.data;

            if (!data) {
                return;
            }

            const {openings, products} = normalizeOpening(data);

            dispatch.openings.addOpening(openings);
            dispatch.products.addProduct(products);
        },
        async removeProduct(payload: { openingId: number, productId: number }, state: RootState): Promise<void> {
            const response = await api.openings.removeProduct(payload.openingId, payload.productId);

            const data = response.data.data;

            if (!data) {
                return;
            }

            const {openings, products} = normalizeOpening(data);

            dispatch.openings.addOpening(openings);
            dispatch.products.addProduct(products);
        },
        async destroy(payload: number, state: RootState): Promise<void> {
            const response = await api.openings.destroy(payload);

            dispatch.openings.remove(payload);
        },
    })
});
