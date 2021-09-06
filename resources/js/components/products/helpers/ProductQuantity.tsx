import {ProductType} from "@type/products";
import React from "react";
import {round} from "~/helpers/Functions";

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

    const kg = round(quantity, 3);
    if (kg > 1) {
        return children({
            text: 'kg',
            total: kg,
        })
    }

    const grams = round(kg * 1000, 3);
    return children({
        text: grams === 1 ? 'grama' : 'gramas',
        total: grams,
    })
};
