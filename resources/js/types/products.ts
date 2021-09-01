import {Pivot, SoftDeletes, Timestamps} from "~/types";
import {Media} from "@type/media";

export type WithMedia = {
    media: Media[];
}

export type WithQuantityPivot = Pivot<{
    quantity: number;
    quantity_cost: number;
}>

export type ProductType<T = unknown> = T &
    ProductProperties &
    ProductComputedProperties &
    ProductRelationshipProperties &
    Timestamps &
    SoftDeletes;

export type ProductProperties = {
    name: string;
    description: string;
    type: 'weight' | 'unit';
    quantity_cost: number; /* unit price or kg price */
    unit_name_singular: string;
    unit_name_plural: string;
    weight_increment: number;
}

export type ProductRelationshipProperties = {
    media: Media[];
}

export type ProductComputedProperties = {
    id: number;
    media_links: { [id: number]: string };
}
