import {createModel} from "@rematch/core";
import {RootModel}   from "./index";
import {RootState}   from "../store";

export type AuthState = {
    me?: {
        name: string,
        email: string,
    },
    failed?: boolean,
};

export type LoginCredentials = {
    email: string,
    password: string,
}

export type RegisterCredentials = {
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
}

export const auth = createModel<RootModel>()({
    state: {} as AuthState,
    reducers: {
        setUser: (state, payload: object) => {
            return {me: payload} as AuthState;
        },
        setFailed: (state, payload: boolean) => {
            return {failed: payload} as AuthState;
        }
    },

    effects: (dispatch) => ({
        async csrf(): Promise<void> {
            await window.axios.get('/sanctum/csrf-cookie');
        },

        async me(): Promise<object> {
            await dispatch.auth.csrf();
            let response = await window.axios.get('/me');

            const user = response.data.user;

            if (user) {
                dispatch.auth.setUser(user as AuthState);
            }

            return user;
        },

        async registration(payload: RegisterCredentials): Promise<void> {
            const {name, email, password, password_confirmation} = payload;

            return await window.axios.post('/register', {
                name, email, password, password_confirmation,
            });
        },

        async update(payload: object, state: RootState): Promise<void> {
            return await window.axios.patch('/me', payload);
        },

        async logout(): Promise<void> {
            const me = await dispatch.auth.me();

            // @ts-ignore
            if (!me) {
                return;
            }

            try {
                const response = await window.axios.post('/logout');

                dispatch.auth.setUser({});
            } catch (e) {
                dispatch.auth.setFailed(true);
            }
        },

        async login(payload: LoginCredentials, state: RootState): Promise<void> {
            const {email, password} = payload;

            await dispatch.auth.csrf();
            const me = await dispatch.auth.me();

            // @ts-ignore
            if (me) {
                return;
            }

            try {
                const response = await window.axios.post('/login', {
                    email, password,
                });

                dispatch.auth.setUser({
                    name: email,
                    email: email,
                });
            } catch (e) {
                dispatch.auth.setFailed(true);
            }
        }
    })
});
