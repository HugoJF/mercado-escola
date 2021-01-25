import React from "react";

const formatter = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'});

export type PriceFormatterProps = {
    cents?: boolean;
    price: number;
}

export const PriceFormatter: React.FC<PriceFormatterProps> = ({cents = false, price}) => (
    <>{formatter.format(price / (cents ? 100 : 1))}</>
);
