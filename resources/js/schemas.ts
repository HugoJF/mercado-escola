import {schema} from 'normalizr';

// Define a users schema
export const productSchema = new schema.Entity('products');

// Define your comments schema
export const openingsSchema = new schema.Entity('openings', {
    products: [productSchema]
});
