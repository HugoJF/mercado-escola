import {Models}    from "@rematch/core";
import {auth}      from "./auth";
import {addresses} from "./addresses";
import {openings}  from "./openings";
import {products}  from "./products";

export interface RootModel extends Models<RootModel> {
    // @ts-ignore
    auth: typeof auth;
    addresses: typeof addresses;
    openings: typeof openings;
    products: typeof products;
}

export const models: RootModel = {
    auth,
    addresses,
    openings,
    products
};
