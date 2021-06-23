import React from "react";
import * as QuantityConfig from "../../configs/ProductQuantityConfig";
import {ProductType} from "../../types/products";

export type QuantityTypes = keyof typeof QuantityConfig;

export type QuantityTypeTextProps = {
    product: ProductType;
    amount?: number;
    showTotal?: boolean;
}

const byWeight = ({product, amount, showTotal}: QuantityTypeTextProps): any[] => {
    if (showTotal) {
        const total = amount! * product.weight_increment;

        return [
            total,
            total === 1 ? 'grama' : 'gramas',
        ]
    }
    return [
        null,
        'kg'
    ]
};

const byUnit = ({product, amount, showTotal}: QuantityTypeTextProps): any[] => {
    if (showTotal) {
        return [
            amount,
            amount === 1 ? product.unit_name_singular : product.unit_name_plural,
        ]
    }

    return [
        null,
        product.unit_name_singular,
    ]
};

export const rawTypeText = (params: QuantityTypeTextProps) => {
    if (params.product.quantity_type === 'weight') {
        return byWeight(params).filter(Boolean).join(' ');
    } else {
        return byUnit(params).filter(Boolean).join(' ');
    }
};

export const QuantityTypeText: React.FC<QuantityTypeTextProps> = (params: QuantityTypeTextProps) => {
    return <>{rawTypeText(params)}</>;
};
