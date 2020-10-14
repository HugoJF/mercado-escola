import {Models}    from "@rematch/core";
import {auth}      from "./auth";
import {addresses} from "./addresses";

export interface RootModel extends Models<RootModel> {
    // @ts-ignore
    auth: typeof auth;
    addresses: typeof addresses;
}

export const models: RootModel = {auth, addresses};
