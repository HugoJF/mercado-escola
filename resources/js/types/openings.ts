import {Pivot, Timestamps} from "~/types";
import {ProductType} from "./products";
import {OrderType} from "./orders";

export type OpeningWithProducts = { products: ProductType<PivotOpeningProduct>[] };
export type PivotOpeningProduct = Pivot<{
    opening_id: number;
    product_id: number;
}>

export type OpeningReportProperties = {
    product: ProductType;
    report: {
        total: string;
        orders: number;
    }
}

export type OpeningReport = {
    opening: OpeningType;
    data: OpeningReportProperties[];
};

export type OpeningType<T = unknown> = T
    & OpeningProperties
    & OpeningComputedProperties
    & OpeningRelationshipProperties
    & Timestamps;

export type OpeningProperties = {
    delivery_fee: number;
    max_delivery_orders: number;
    max_pickup_orders: number;
    opens_at: string;
    closes_at: string;
    delivers_at: string;
}

export type OpeningComputedProperties = {
    id: number;
    pickup_count: number;
    delivery_count: number;
}

export type OpeningRelationshipProperties = {
    products: ProductType[];
    orders: OrderType[];
}
