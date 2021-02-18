import {Models}    from "@rematch/core";
import {auth}      from "./auth";
import {addresses} from "./addresses";
import {openings}  from "./openings";
import {products}  from "./products";
import {favorites} from "./favorites";
import {cart}      from "./cart";
import {orders}    from "./orders";
import {users}     from "./users";
import {toasts}    from "./toasts";

export interface RootModel extends Models<RootModel> {
    // @ts-ignore
    auth: typeof auth,
    // addresses: typeof addresses,
    // openings: typeof openings,
    // products: typeof products,
    // favorites: typeof favorites,
    cart: typeof cart,
    // orders: typeof orders,
    // users: typeof users,
    toasts: typeof toasts,
}

export const models: RootModel = {
    auth,
    // addresses,
    // openings,
    // products,
    // favorites,
    cart,
    // orders,
    // users,
    toasts,
};
