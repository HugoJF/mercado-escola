import {createModel}                                      from "@rematch/core";
import {RootModel}                                        from "./index";
import {RootState}                                        from "../store";
import {AuthState, LoginCredentials, RegisterCredentials} from "../types/auth";
import {UserProperties}                                   from "../types/users";

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
            let response = await window.axios.get('/api/me');

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

        async update(payload: Partial<UserProperties>): Promise<void> {
            const response = await window.axios.patch('/api/me', payload);

            const user = response.data.user;

            if (user) {
                dispatch.auth.setUser(user as AuthState);
            }

            return user;
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

                await dispatch.auth.me();
            } catch (e) {
                dispatch.auth.setFailed(true);
                // TODO: maybe pass API message
                throw Error('Login failed');
            }
        }
    })
});
