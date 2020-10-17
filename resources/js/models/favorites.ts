import {createModel} from "@rematch/core";
import {RootModel}   from "./index";
import {RootState}   from "../store";
import {ProductType} from "./products";

export type FavoritesState = {
    favorites: number[];
};

export const favorites = createModel<RootModel>()({
    state: {
        favorites: [],
    } as FavoritesState,
    reducers: {
        store: (state, payload: number | number[]) => {
            if (!Array.isArray(payload)) {
                payload = [payload];
            }

            let set = payload.reduce(
                (set, favorite) => set.add(favorite),
                new Set(state.favorites)
            );

            state.favorites = Array.from(set);

            return state;
        },
        delete: (state, payload: number) => {
            state.favorites = state.favorites.filter(id => id !== payload);

            return state;
        },
    },

    effects: (dispatch) => ({
        async index(payload, state: RootState): Promise<void> {
            const response = await window.axios.get('/favorites');

            let favoritesProducts = response.data as ProductType[];

            let favorites = favoritesProducts.map(product => product.id);

            dispatch.products.addProduct(favoritesProducts);
            dispatch.favorites.store(favorites);
        },
        async create(payload: number, state: RootState): Promise<void> {
            const response = await window.axios.post(`/favorites/${payload}`);

            dispatch.favorites.store(payload);
        },
        async destroy(payload: number, state: RootState): Promise<void> {
            const response = await window.axios.delete(`/favorites/${payload}`);

            dispatch.favorites.delete(payload);
        },
    })
});
