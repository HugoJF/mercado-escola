import {bxios}                          from "../bxios";
import {AddressProperties, AddressType} from "../types/addresses";

export const addresses = {
    index: () => bxios()
        .get('addresses')
        .send<AddressType[]>(),
    store: (data: AddressProperties) => bxios()
        .post('addresses')
        .body(data)
        .send<AddressType>(),
    destroy: (id: number) => bxios()
        .delete('addresses', id)
        .send<AddressType>(),
};
