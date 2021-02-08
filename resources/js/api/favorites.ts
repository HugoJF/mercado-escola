import {bxios}            from "../bxios";
import {ResourceResponse} from "../types";
import {ProductType}      from "../models/products";

export const favorites = {
    index: () => bxios()
        .get('favorites')
        .send<ResourceResponse<ProductType[]>>(),
    store: (productId: number) => bxios()
        .post('favorites', productId)
        .send<ResourceResponse<null>>(),
    destroy: (productId: number) => bxios()
        .delete('favorites', productId)
        .send<ResourceResponse<null>>(),
};
