import {ProductQuantityConfig} from "../hooks/useCartQuantity";

export const UNIT: ProductQuantityConfig = {
    singular: 'unidade',
    plural: 'unidades',
    step: 1,
};

export const WEIGHT_1G: ProductQuantityConfig = {
    singular: 'grama',
    plural: 'gramas',
    step: 1,
};

export const WEIGHT_10G: ProductQuantityConfig = {
    singular: 'grama',
    plural: 'gramas',
    showStep: true,
    step: 10,
};

export const WEIGHT_100G: ProductQuantityConfig = {
    singular: 'grama',
    plural: 'gramas',
    showStep: true,
    step: 100,
};

export const WEIGHT_1000G: ProductQuantityConfig = {
    singular: 'kg',
    plural: 'kg',
    step: 1,
};
