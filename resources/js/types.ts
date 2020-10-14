import {init, RematchDispatch, RematchRootState} from "@rematch/core";
import {models, RootModel}                       from "./models";
import createImmerPlugin                         from "@rematch/immer";


export type Timestamps = {
    updated_at: string;
    created_at: string;
}

export type SoftDeletes = {
    deleted_at: string;
}
