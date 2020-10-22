import {schema} from 'normalizr';

export const productSchema = new schema.Entity('products');

export const openingsSchema = new schema.Entity('openings', {
    products: [productSchema]
});
export const ordersSchema = new schema.Entity('orders', {
    products: [productSchema]
});
