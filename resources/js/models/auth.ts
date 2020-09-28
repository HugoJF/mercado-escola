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
            let response = await axios.get('/sanctum/csrf-cookie');

        },
        async me(): Promise<object> {
            let response = await axios.get('/me');

            const user = response.data.user;

            if (user) {
                dispatch.auth.setUser(user as AuthState);
            }

            return user;
        },
        async registration(payload: RegisterCredentials): Promise<void> {
            let registration = await axios.post('/register', {
                name: 'Hugo',
                email: 'hugo_jeller@hotmail.com',
                password: '123123123',
                password_confirmation: '123123123',
            });
        },
        async login(payload: LoginCredentials, state: RootState): Promise<void> {
            const {email, password} = payload;

            const me = await dispatch.auth.me();

            // @ts-ignore
            console.log('state.auth', me);

            // @ts-ignore
            if (me) {
                return;
            }

            try {
                const response = await axios.post('/login', {
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
