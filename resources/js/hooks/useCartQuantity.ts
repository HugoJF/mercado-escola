import {useCart}     from "../selectors";
import {useDispatch} from "react-redux";
import {Dispatch}    from "../store";
import {UNIT}        from "../configs/ProductQuantityConfig";

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
    () => void,
    () => void
];

export default function useCartQuantity(productId: number, options: ProductQuantityConfig = UNIT): useProductQuantityProps {
    const dispatch = useDispatch<Dispatch>();
    const cart = useCart();

    const quantity = cart.items[productId];
    const text = quantity === 1 ? options.singular : options.plural;
    const total = quantity * options.step;

    function add() {
        const newAmount = (quantity || 0) + 1;

        dispatch.cart.add({
            product: productId,
            amount: newAmount
        });
    }

    function subtract() {
        const newAmount = Math.max(quantity - 1, 0);

        if (newAmount === 0) {
            dispatch.cart.remove(productId);
        } else {
            dispatch.cart.add({
                product: productId,
                amount: newAmount
            });
        }
    }

    return [text, quantity, total, add, subtract];
}
