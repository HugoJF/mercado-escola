import {bxios}                                               from "../bxios";
import {ResourceResponse}                                    from "../types";
import {OpeningProperties, OpeningType, OpeningWithProducts} from "../types/openings";

export const openings = {
    index: () => bxios()
        .get('openings')
        .send<ResourceResponse<OpeningType[]>>(),
    show: (id: Id) => bxios()
        .get('openings', id)
        .send<ResourceResponse<OpeningType<OpeningWithProducts>>>(),
    current: () => bxios()
        .get('openings', 'current')
        .send<ResourceResponse<OpeningType<OpeningWithProducts>>>(),
    store: (data: OpeningProperties) => bxios()
        .post('openings')
        .body(data)
        .send<ResourceResponse<OpeningType>>(),
    update: (id: Id, data: Partial<OpeningProperties>) => bxios()
        .patch('openings', id)
        .body(data)
        .send<ResourceResponse<OpeningType>>(),
    addProduct: (openingId: Id, productId: Id) => bxios()
        .post('openings', openingId, 'products', productId)
        .send<ResourceResponse<OpeningType>>(),
    removeProduct: (openingId: Id, productId: Id) => bxios()
        .delete('openings', openingId, 'products', productId)
        .send<ResourceResponse<OpeningType>>(),
    destroy: (id: Id) => bxios()
        .delete('openings', id)
        .send<ResourceResponse<OpeningType>>(),
};
