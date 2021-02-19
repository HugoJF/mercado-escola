import {useCart}                   from "../selectors";
import {useDispatch}               from "react-redux";
import {Dispatch}                  from "../store";
import * as ProductQuantityConfigs from "../configs/ProductQuantityConfig";
import {UNIT}                      from "../configs/ProductQuantityConfig";
import {ProductType}               from "../types/products";

export type ProductQuantityConfig = {
    singular: string;
    plural: string;
    step: number;
    showStep?: boolean,
}

export type useProductQuantityProps = [
    string,
    number,
    number,
    () => boolean,
    () => boolean
];

export default function useCartQuantity(product?: ProductType): useProductQuantityProps {
    const dispatch = useDispatch<Dispatch>();
    const cart = useCart();

    const options = product ? ProductQuantityConfigs[product.quantity_type] : UNIT;
    const quantity = product ? cart.items[product.id] : 0;
    const text = quantity === 1 ? options.singular : options.plural;
    const total = quantity * options.step;

    function add(): boolean {
        if (!product) {
            return false;
        }

        const newAmount = (quantity || 0) + 1;

        dispatch.cart.add({
            product: product.id,
            amount: newAmount
        });

        return !quantity && newAmount > 0;
    }

    function subtract(): boolean {
        if (!product) {
            return false;
        }
        
        const newAmount = Math.max(quantity - 1, 0);

        if (newAmount === 0) {
            dispatch.cart.remove(product.id);
        } else {
            dispatch.cart.add({
                product: product.id,
                amount: newAmount
            });
        }

        return quantity > 0 && !newAmount;
    }

    return [text, quantity, total, add, subtract];
}
