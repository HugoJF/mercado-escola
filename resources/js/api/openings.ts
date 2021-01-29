import {bxios}                 from "../bxios";
import {ResourceResponse}      from "../types";
import {OrderStore, OrderType}          from "../models/orders";
import {OpeningProperties, OpeningType} from "../models/openings";

export const openings = {
    index: () => bxios()
        .get('openings')
        .send<ResourceResponse<OpeningType[]>>(),
    current: () => bxios()
        .get('openings', 'current')
        .send<ResourceResponse<OpeningType>>(),
    store: (data: OpeningProperties) => bxios()
        .post('openings')
        .body(data)
        .send<ResourceResponse<OpeningType>>(),
    update: (id: number, data: Partial<OpeningProperties>) => bxios()
        .patch('openings', id)
        .body(data)
        .send<ResourceResponse<OpeningType>>(),
    addProduct: (openingId: number, productId: number) => bxios()
        .post('openings', openingId, 'products', productId)
        .send<ResourceResponse<OpeningType>>(),
    removeProduct: (openingId: number, productId: number) => bxios()
        .delete('openings', openingId, 'products', productId)
        .send<ResourceResponse<OpeningType>>(),
    destroy: (id: number) => bxios()
        .delete('openings', id)
        .send<ResourceResponse<OpeningType>>(),
};