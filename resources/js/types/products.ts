import {Media, Pivot, SoftDeletes, Timestamps} from "../types";
import {QuantityTypes}                         from "../components/ui/QuantityTypeText";

export type WithQuantityPivot = Pivot<{
    quantity: number;
    quantity_cost: number;
}>

export type ProductType<T = {}> = T &
    ProductProperties &
    ProductComputedProperties &
    ProductRelationshipProperties &
    Timestamps &
    SoftDeletes;

export type ProductProperties = {
    name: string;
    description: string;
    quantity_type: QuantityTypes;
    quantity_cost: number;
}

export type ProductRelationshipProperties = {
    media: Media[];
}

export type ProductComputedProperties = {
    id: number;
    media_links: { [id: number]: string };
}
