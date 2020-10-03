import {Models} from "@rematch/core";
import {auth}   from "./auth";

export interface RootModel extends Models<RootModel> {
    // @ts-ignore
    auth: typeof auth;
}

export const models: RootModel = {auth};
