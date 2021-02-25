import {bxios}                           from "../bxios";
import {CartType, PivotCartProductsUser} from "../types/cart";
import {ProductType}                     from "../types/products";
import {ResourceResponse}                from "../types";

export const cart = {
    index: () => bxios()
        .get('cart')
        .send<CartType>(),
    updateAddress: (addressId: Id|null) => bxios()
        .patch('cart', 'address')
        .body({address_id: addressId})
        .send<CartType>(),
    product: (id: Id) => bxios()
        .get('cart', 'products', id)
        .send<ResourceResponse<null|ProductType<PivotCartProductsUser>>>(),
    addProduct: (id: Id, quantity: number) => bxios()
        .post('cart', 'products', id)
        .body({quantity})
        .send<CartType>(),
    removeProduct: (id: Id) => bxios()
        .delete('cart', 'products', id)
        .send<CartType>(),
};
