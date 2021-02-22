import {createModel} from "@rematch/core";
import {RootModel}   from "../stores";
import {RootState}   from "../store";
import {SoftDeletes, Timestamps} from "../types";
import {QuantityTypes}           from "../components/ui/QuantityTypeText";
import {api}                     from "../api";

export type ProductType<T = {}> = T &
    ProductProperties &
    ProductComputedProperties &
    Timestamps &
    SoftDeletes;

export type ProductProperties = {
    name: string;
    description: string;
    quantity_type: QuantityTypes;
    quantity_cost: number;
}

export type ProductComputedProperties = {
    id: number;
    media: { [id: number]: string };
}
