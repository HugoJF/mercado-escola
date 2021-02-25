import {Models} from "@rematch/core";
import {auth}   from "./auth";
import {cart}   from "./cart";
import {toasts} from "./toasts";

export interface RootModel extends Models<RootModel> {
    // @ts-ignore
    auth: typeof auth,
    toasts: typeof toasts,
}

export const models: RootModel = {
    auth,
    toasts,
};
