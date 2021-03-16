import {schema} from 'normalizr';

export const productSchema = new schema.Entity('products');

export const openingsSchema = new schema.Entity('openings', {
    products: [productSchema]
});
export const ordersSchema = new schema.Entity('orders', {
    products: [productSchema],
}, {
    processStrategy: (value) => {
        const quantities = value.products.reduce((acc: any, product: any) =>  {
            acc[product.id] = product.pivot.quantity;
            return acc;
        }, {});
        const costs = value.products.reduce((acc: any, product: any) =>  {
            acc[product.id] = product.pivot.quantity_cost;
            return acc;
        }, {});

        return {...value, quantities, costs}
    }
});
