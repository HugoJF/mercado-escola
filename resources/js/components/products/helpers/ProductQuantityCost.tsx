import {ProductType} from "../../../types/products";
import React from "react";

type ProductQuantityCostProps = {
    product: ProductType;
    quantity: number;
    quantityCostOverride?: number;
    children: (data: { cost: number, total: number, text: string }) => JSX.Element;
}

export const ProductQuantityCost: React.FC<ProductQuantityCostProps> = ({product, quantityCostOverride, quantity, children}) => {
    if (product.type === 'unit') {
        return children({
            cost: quantity * (product.quantity_cost ?? quantityCostOverride),
            text: quantity === 1 ? (product.unit_name_singular ?? 'unidade') : (product.unit_name_plural ?? 'unidades'),
            total: quantity,
        })
    }

    if (quantity > 1000) {
        return children({
            text: 'kg',
            cost: (quantity * product.weight_increment / 1000) * (product.quantity_cost ?? quantityCostOverride),
            total: quantity / 1000,
        })
    }

    return children({
        text: quantity === 1 ? 'grama' : 'gramas',
        cost: (quantity * product.weight_increment / 1000) * (product.quantity_cost ?? quantityCostOverride),
        total: quantity,
    })
};
