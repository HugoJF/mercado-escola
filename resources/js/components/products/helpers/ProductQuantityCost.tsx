import {ProductType} from "@type/products";
import React from "react";

type ProductQuantityCostProps = {
    product: ProductType;
    quantity: number;
    quantityCostOverride?: number;
    children: (data: { cost: number, total: number, text: string }) => JSX.Element;
}

export const ProductQuantityCost: React.FC<ProductQuantityCostProps> = ({
                                                                            product,
                                                                            quantityCostOverride,
                                                                            quantity,
                                                                            children
                                                                        }) => {
    if (product.type === 'unit') {
        return children({
            cost: quantity * (product.quantity_cost ?? quantityCostOverride),
            text: quantity === 1 ? (product.unit_name_singular ?? 'unidade') : (product.unit_name_plural ?? 'unidades'),
            total: quantity,
        })
    }

    const kg = quantity;
    if (kg > 1) {
        return children({
            text: 'kg',
            cost: kg * (product.quantity_cost ?? quantityCostOverride),
            total: kg,
        })
    }

    const grams = Math.round(kg * 1000);
    return children({
        text: grams === 1 ? 'grama' : 'gramas',
        cost: kg * (product.quantity_cost ?? quantityCostOverride),
        total: grams,
    })
};
