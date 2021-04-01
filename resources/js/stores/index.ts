import {Models} from "@rematch/core";
import {auth} from "./auth";
import {toasts} from "./toasts";

export interface RootModel extends Models<RootModel> {
    auth: typeof auth,
    toasts: typeof toasts,
}

export const models: RootModel = {
    auth,
    toasts,
};
