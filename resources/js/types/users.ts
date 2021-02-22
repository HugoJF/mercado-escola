import {createModel} from "@rematch/core";
import {RootModel}   from "../stores";
import {RootState}   from "../store";
import {SoftDeletes, Timestamps} from "../types";
import {api}                     from "../api";

export type UserType = UserProperties & UserComputedProperties & Timestamps & SoftDeletes;

export type UserProperties = {
    name: string,
    phone: string|null,
    email: string,
    admin: boolean,
}

export type UserComputedProperties = {
    id: number;
}
