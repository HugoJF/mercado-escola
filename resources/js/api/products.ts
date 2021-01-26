import {bxios}            from "../bxios";
import {ResourceResponse} from "../types";
import {ProductType}      from "../models/products";

export const products = {
    index: () => bxios()
        .get('products')
        .send<ResourceResponse<ProductType[]>>(),
    create: (data: FormData) => bxios()
        .post('products')
        .body(data)
        .multipartFormData()
        .send<ResourceResponse<ProductType>>(),
    show: (id: number) => bxios()
        .get('products', id)
        .send<ResourceResponse<ProductType>>(),
    update: (id: number, data: FormData) => bxios()
        .patch('products', id)
        .body(data)
        .patchFormDataFix()
        .send<ResourceResponse<ProductType>>(),
    destroy: (id: number) => bxios()
        .delete('products', id)
        .send<ResourceResponse<ProductType>>(),
    destroyMedia: (productId: number, mediaId: number) => bxios()
        .delete('products', productId, 'media', mediaId)
        .send<ResourceResponse<ProductType>>()
};
