import {ProductType} from "@type/products";
import React from "react";

type ProductQuantityProps = {
    product: ProductType;
    quantity: number;
    children: (data: { total: number, text: string }) => JSX.Element;
}

export const ProductQuantity: React.FC<ProductQuantityProps> = ({product, quantity, children}) => {
    if (product.type === 'unit') {
        return children({
            text: quantity === 1 ? (product.unit_name_singular ?? 'unidade') : (product.unit_name_plural ?? 'unidades'),
            total: quantity,
        })
    }

    const weight = product.weight_increment * quantity;

    if (weight > 1000) {
        return children({
            text: 'kg',
            total: weight / 1000,
        })
    }

    return children({
        text: weight === 1 ? 'grama' : 'gramas',
        total: weight,
    })
};
