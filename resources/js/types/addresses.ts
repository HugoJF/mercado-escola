import {SoftDeletes, Timestamps} from "~/types";

export type AddressType = AddressProperties & AddressComputedProperties & Timestamps & SoftDeletes;

export type AddressProperties = {
    address: string;
    number: number;
    latitude: number;
    longitude: number;
    complement?: string;
}

export type AddressComputedProperties = {
    id: number;
    user_id: number;
}
