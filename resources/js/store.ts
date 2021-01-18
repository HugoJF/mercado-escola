import {init, RematchDispatch, RematchRootState} from "@rematch/core";
import {models, RootModel}                       from "./models";
import createImmerPlugin                         from "@rematch/immer";
import persist                                   from '@rematch/persist';
import storage                                   from 'redux-persist/lib/storage'
import * as Sentry from "@sentry/react";

export const store = init<RootModel>({
    models,
    plugins: [
        persist({
            key: 'persist-storage',
            storage,
            whitelist: ['cart']
        }),
        createImmerPlugin(),
        Sentry.createReduxEnhancer()
    ]
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
