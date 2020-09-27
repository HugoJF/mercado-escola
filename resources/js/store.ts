import {init, RematchDispatch, RematchRootState} from "@rematch/core";
import {models, RootModel}                       from "./models";


export const store = init<RootModel>({
    models,
    plugins: []
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
