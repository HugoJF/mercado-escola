import {ProductType} from "../../../types/products";
import React from "react";

type ProductCostProps = {
    product: ProductType;
    children: (data: { cost: number, text: string }) => JSX.Element;
}

export const ProductCost: React.FC<ProductCostProps> = ({product, children}) => {
    if (product.type === 'unit') {
        return children({
            text: product.unit_name_singular ?? 'unidade',
            cost: product.quantity_cost,
        })
    }

    return children({
        text: 'kg',
        cost: product.quantity_cost,
    })
};
