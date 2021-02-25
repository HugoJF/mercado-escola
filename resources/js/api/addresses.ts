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
    show: (id: Id) => bxios()
        .get('address', id)
        .send<AddressType>(),
    destroy: (id: Id) => bxios()
        .delete('addresses', id)
        .send<AddressType>(),
};
