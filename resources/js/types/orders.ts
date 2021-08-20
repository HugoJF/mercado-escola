import {ProductType} from "./products";
import {Pivot, SoftDeletes, Timestamps} from "~/types";
import {AddressType} from "./addresses";
import {OpeningType} from "./openings";

export type OrderWithAddress = { address?: AddressType };
export type OrderWithOpening = { opening: OpeningType };
export type OrderWithProducts = { products: ProductType<PivotOrderProduct>[] };
export type PivotOrderProduct = Pivot<{
    order_id: string;
    product_id: number;
    quantity: number;
    quantity_cost: number;
}>

export type OrderType<T = unknown> = T &
    OrdersProperties &
    OrdersComputedProperties &
    OrderRelationshipProperties &
    Timestamps &
    SoftDeletes;

export type OrdersProperties = {
    state: OrderStateEnum;
    delivery_fee: number;
    opening_id: number;
    address_id: number;
}

export type OrdersComputedProperties = {
    id: string;
    total: number;
    products_cost: number;
}

export type OrderRelationshipProperties = {
    products: number[];
    address: AddressType;
    quantities: { [productId: number]: number }
    costs: { [productId: number]: number }
}

export enum OrderStateEnum {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    READY = 'READY',
    SHIPPING = 'SHIPPING',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
    REJECTED = 'REJECTED',
}
