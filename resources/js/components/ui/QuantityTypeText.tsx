import React from "react";
import * as QuantityConfig from "../../configs/ProductQuantityConfig";

export type QuantityTypes = keyof typeof QuantityConfig;

export type QuantityTypeTextProps = {
    type: QuantityTypes;
    quantity?: number;
    showTotal?: boolean;
}

// FIXME: improve this component naming scheme
export const rawTypeText = ({type, quantity, showTotal}: QuantityTypeTextProps) => {
    const {plural, singular, step, showStep} = QuantityConfig[type];
    const multiplier = showTotal ? step : 1;
    const number = (!quantity ? step : quantity) * multiplier;

    const output = [
        (showStep || quantity) && number,
        number === 1 ? singular : plural
    ];

    return output.filter(i => i).join(' ');
};

export const QuantityTypeText: React.FC<QuantityTypeTextProps> = (params: QuantityTypeTextProps) => {
    return <>{rawTypeText(params)}</>;
};
