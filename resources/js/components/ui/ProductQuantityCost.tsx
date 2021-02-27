import React               from "react";
import * as QuantityConfig from "../../configs/ProductQuantityConfig";
import * as DisplayConfig  from "../../configs/ProductDisplayConfig";
import {ProductType}       from "../../types/products";
import {rawTypeText}       from "./QuantityTypeText";

export type QuantityTypes = keyof typeof QuantityConfig;

export type ProductQuantityCostProps = {
    product: ProductType;
    children: (cost: number, text: string) => React.ReactElement;
}

export const ProductQuantityCost: React.FC<ProductQuantityCostProps> = ({product, children}) => {
    const displayConfig = DisplayConfig[product.quantity_type];

    if (displayConfig.factor) {
        return children(product.quantity_cost * displayConfig.factor, 'kg');
    }

    return children(product.quantity_cost, rawTypeText({type: product.quantity_type}));
};
