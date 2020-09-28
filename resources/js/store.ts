import {init, RematchDispatch, RematchRootState} from "@rematch/core";
import {models, RootModel}                       from "./models";
import createImmerPlugin                         from "@rematch/immer";

export const store = init<RootModel>({
    models,
    plugins: [
        createImmerPlugin(),
    ]
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
