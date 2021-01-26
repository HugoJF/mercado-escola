import {bxios}                          from "../bxios";
import {AddressProperties, AddressType} from "../models/addresses";

export const addresses = {
    index: () => bxios()
        .get('addresses')
        .send<AddressType[]>(),
    store: (data: AddressProperties) => bxios()
        .post('addresses')
        .body(data)
        .send<AddressType>()
};
