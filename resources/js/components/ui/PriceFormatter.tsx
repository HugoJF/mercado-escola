import React from "react";

const formatter = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'});

export type PriceFormatterProps = {
    price: number;
}

export const PriceFormatter: React.FC<PriceFormatterProps> = ({price}) => (
    <>{formatter.format(price)}</>
);
