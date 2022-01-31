import {Models} from "@rematch/core";
import {auth} from "./auth";
import {toasts} from "./toasts";
import {address} from "./address";

export interface RootModel extends Models<RootModel> {
    auth: typeof auth,
    toasts: typeof toasts,
    address: typeof address,
}

export const models: RootModel = {
    auth,
    toasts,
    address
};
