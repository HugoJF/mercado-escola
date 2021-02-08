import {createModel} from "@rematch/core";
import {RootModel}   from "./index";
import {RootState}   from "../store";
import {api}         from "../api";

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
            const response = await api.favorites.index();

            let favoritesProducts = response.data.data;

            let favorites = favoritesProducts.map(product => product.id);

            dispatch.products.addProduct(favoritesProducts);
            dispatch.favorites.store(favorites);
        },
        async create(payload: number, state: RootState): Promise<void> {
            const response = await api.favorites.store(payload);

            dispatch.favorites.store(payload);
        },
        async destroy(payload: number, state: RootState): Promise<void> {
            const response = await api.favorites.destroy(payload);

            dispatch.favorites.delete(payload);
        },
    })
});
