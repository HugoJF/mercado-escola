import {Modal, ModalProps}          from "../components/ui/Modal";
import React, {useEffect, useState} from "react";
import {Button}                     from "../components/ui/Button";
import {ProductType}                from "../types/products";
import {PriceFormatter}             from "../components/ui/PriceFormatter";
import {ProductQuantityCost}        from "../components/ui/ProductQuantityCost";
import * as ProductQuantityConfig   from "../configs/ProductQuantityConfig";

export type ProductQuantityActionMenuProps = {
    product: ProductType;
    currentQuantity: number;
    onQuantityChange: (quantity: number) => void;
}

export const ProductQuantityActionMenu: React.FC<ModalProps & ProductQuantityActionMenuProps> = ({product, currentQuantity, open, onQuantityChange, onClose}) => {
    const [quantity, setQuantity] = useState(1);

    const config = ProductQuantityConfig[product.quantity_type];
    const total = quantity * config.step;
    const text = total === 1 ? config.singular : config.plural;

    useEffect(() => {
        setQuantity(currentQuantity)
    }, [currentQuantity]);

    function handleOnAdd() {
        setQuantity(quantity + 1);
    }

    function handleSubtract() {
        setQuantity(Math.max(0, quantity - 1))
    }

    function handleOnSubmit() {
        onQuantityChange(quantity);

        if (onClose) {
            onClose();
        }
    }

    return <Modal open={open} onClose={onClose} className="space-y-4">
        {/* Header */}
        <div className="pb-2 border-b">
            <h1 className="text-center text-lg font-medium">Adicionando ao carrinho</h1>
            <p className="text-center text-base text-gray-500">
                Adicionando {product.name} ao carrinho
            </p>
        </div>

        {/* Prices and quantities */}
        <div className="px-4 flex items-center justify-between">
            <div className="flex items-baseline">
                {/* If cart has any quantity of this product, show the total cost */}
                {!!quantity && <span className="text-xl text-secondary-500 font-medium">
                    <PriceFormatter cents price={product.quantity_cost * quantity}/>
                </span>}

                {/* If cart doesn't contain the product, just show the display format of it */}
                {!quantity && <ProductQuantityCost product={product}>
                    {(cost, text) => <>
                        <span className="text-xl text-secondary-500 font-medium">
                            <PriceFormatter cents price={cost}/>
                        </span>
                        <span className="ml-px text-gray-500">/{text}</span>
                    </>}
                </ProductQuantityCost>}
            </div>
            {!!quantity && <div className="flex items-center">
                <div className="mx-4 text-xl font-medium">{total} {text}</div>
            </div>}
        </div>

        {/* Buttons */}
        <div className="px-2 flex space-x-4">
            <div
                className="transition-colors duration-150 w-24
                            flex flex-shrink justify-center items-center border
                            text-gray-700 text-3xl font-bold
                            rounded-lg cursor-pointer select-none"
                onClick={handleSubtract}
            >
                <span className="pb-1">-</span>
            </div>
            <div
                className="transition-colors duration-150 w-24
                            flex flex-shrink justify-center items-center border
                            text-gray-700 text-3xl font-bold
                            rounded-lg cursor-pointer select-none"
                onClick={handleOnAdd}
            >
                <span className="pb-1">+</span>
            </div>
            <Button onClick={handleOnSubmit}>
                {quantity === 0 ? (currentQuantity > 0 ? 'Remover' : 'Cancelar') : (currentQuantity > 0 ? 'Atualizar' : 'Adicionar')}
            </Button>
        </div>
    </Modal>
};
