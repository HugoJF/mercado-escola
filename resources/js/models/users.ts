import {createModel}             from "@rematch/core";
import {RootModel}               from "./index";
import {RootState}               from "../store";
import {SoftDeletes, Timestamps} from "../types";

export type UserType = UserProperties & UserComputedProperties & Timestamps & SoftDeletes;

export type UserProperties = {
    name: string,
    phone: string,
    email: string,
    admin: boolean,
}

export type UserComputedProperties = {
    id: number;
}

export type UsersState = {
    users: { [id: number]: UserType };
};

export const users = createModel<RootModel>()({
    state: {
        users: {},
    } as UsersState,

    reducers: {
        reset: (state, payload) => {
            state.users = {};

            return state;
        },
        add: (state, payload: UserType | UserType[]) => {
            if (!Array.isArray(payload)) {
                payload = [payload];
            }

            for (let product of payload) {
                state.users[product.id] = product;
            }

            return state;
        },
        remove: (state, payload: number) => {
            delete state.users[payload];

            return state;
        }
    },

    effects: (dispatch) => ({
        async index(payload, state: RootState): Promise<void> {
            const response = await window.axios.get('/users');

            const users = response.data.data as UserType[];

            dispatch.users.reset();
            dispatch.users.add(users);
        },

        async update(payload: { id: number, data: Partial<UserProperties> }, state: RootState): Promise<void> {
            // https://github.com/laravel/framework/issues/13457
            const response = await window.axios.patch(`/users/${payload.id}`, payload.data);

            dispatch.users.add(response.data.data);
        },
    })
});
