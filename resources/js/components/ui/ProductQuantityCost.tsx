import React from "react";
import * as QuantityConfig from "../../configs/ProductQuantityConfig";
import {ProductType} from "../../types/products";
import {rawTypeText} from "./QuantityTypeText";

export type QuantityTypes = keyof typeof QuantityConfig;

export type ProductQuantityCostProps = {
    product: ProductType;
    children: (cost: number, text: string) => React.ReactElement;
}

// TODO: no need to exist
export const ProductQuantityCost: React.FC<ProductQuantityCostProps> = ({product, children}) => {
    return children(product.quantity_cost, rawTypeText({product}));
};
