import {createModel} from "@rematch/core";
import {RootModel}   from "../stores";
import {RootState}                      from "../store";
import {Pivot, SoftDeletes, Timestamps} from "../types";
import {QuantityTypes}                  from "../components/ui/QuantityTypeText";
import {api}                     from "../api";

export type WithQuantityPivot = Pivot<{
    quantity: number;
    quantity_cost: number;
}>

// TODO: missing media property
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
    media_links: {[id: number]: string};
}
