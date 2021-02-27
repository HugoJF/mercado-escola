export type ProductDisplayConfig = {
    factor: number|null;
}

export const UNIT: ProductDisplayConfig = {
    factor: null,
};

export const WEIGHT_1G: ProductDisplayConfig = {
    factor: 1000,
};

export const WEIGHT_10G: ProductDisplayConfig = {
    factor: 100,
};

export const WEIGHT_100G: ProductDisplayConfig = {
    factor: 10,
};

export const WEIGHT_1000G: ProductDisplayConfig = {
    factor: 1,
};
