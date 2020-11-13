import React               from "react";
import * as QuantityConfig from "../../configs/ProductQuantityConfig";

export type QuantityTypes = keyof typeof QuantityConfig;

export type QuantityTypeTextProps = {
    type: QuantityTypes,
    quantity?: number,
    showTotal?: boolean;
}

export const QuantityTypeText: React.FC<QuantityTypeTextProps> = ({type, quantity, showTotal}: QuantityTypeTextProps) => {
    const {plural, singular, step, showStep} = QuantityConfig[type];
    const multiplier = showTotal ? step : 1;
    const number = (quantity === undefined ? step : quantity) * multiplier;

    return <>{showStep && `${number} `}{number === 1 ? singular : plural}</>
};
