import React               from "react";
import * as QuantityConfig from "../../configs/ProductQuantityConfig";

export type QuantityTypes = keyof typeof QuantityConfig;

export type QuantityTypeTextProps = {
    type: QuantityTypes,
    quantity?: number,
}

export const QuantityTypeText: React.FC<QuantityTypeTextProps> = ({type, quantity = 1}: QuantityTypeTextProps) => {
    const {plural, singular} = QuantityConfig[type];

    return <>{quantity === 1 ? singular : plural}</>
};
