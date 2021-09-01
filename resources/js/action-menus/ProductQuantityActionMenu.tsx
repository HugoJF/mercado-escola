import {Modal, ModalProps} from "@components/ui/Modal";
import React, {useEffect, useState} from "react";
import {Button} from "@components/ui/Button";
import {ProductType} from "@type/products";
import {PriceFormatter} from "@components/ui/PriceFormatter";
import {ProductCost} from "@components/products/helpers/ProductCost";
import {ProductQuantity} from "@components/products/helpers/ProductQuantity";
import {ProductQuantityCost} from "@components/products/helpers/ProductQuantityCost";

export type ProductQuantityActionMenuProps = {
    product: ProductType;
    currentQuantity: number;
    onQuantityChange: (quantity: number) => void;
}

export const ProductQuantityActionMenu: React.FC<ModalProps & ProductQuantityActionMenuProps> = ({product, currentQuantity, open, onQuantityChange, onClose}) => {
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        // If item is not in cart, manually initialize the selector with 1 item
        if (currentQuantity === 0) {
            setQuantity(1);
        } else {
            setQuantity(currentQuantity)
        }
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
                {Boolean(quantity) && <span className="text-xl text-secondary-500 font-medium">
                    <ProductQuantityCost product={product} quantity={quantity}>
                        {({cost}) => <PriceFormatter price={cost}/>}
                    </ProductQuantityCost>
                </span>}

                {/* If cart doesn't contain the product, just show the display format of it */}
                {!quantity && <ProductCost product={product}>
                    {({cost, text}) => <>
                        <span className="text-xl text-secondary-500 font-medium">
                            <PriceFormatter price={cost}/>
                        </span>
                    <span className="ml-px text-gray-500">/{text}</span>
                </>}
                </ProductCost>}
            </div>
            {Boolean(quantity) && <div className="flex items-center">
                <ProductQuantity product={product} quantity={quantity}>
                    {({total, text}) => <div className="mx-4 text-xl font-medium">{total} {text}</div>}
                </ProductQuantity>
            </div>}
        </div>

        {/* Buttons */}
        <div className="px-2 flex space-x-4">
            <div
                className="transition-colors duration-150 px-6
                            flex flex-shrink flex-grow-0 justify-center items-center border
                            text-gray-700 text-3xl font-bold
                            rounded-lg cursor-pointer select-none"
                onClick={handleSubtract}
            >
                <span className="pb-1">-</span>
            </div>
            <div
                className="transition-colors duration-150 px-6
                            flex flex-shrink flex-grow-0 justify-center items-center border
                            text-gray-700 text-3xl font-bold
                            rounded-lg cursor-pointer select-none"
                onClick={handleOnAdd}
            >
                <span className="pb-1">+</span>
            </div>
            <Button className="flex-grow" onClick={handleOnSubmit}>
                {quantity === 0 ? (currentQuantity > 0 ? 'Remover' : 'Cancelar') : (currentQuantity > 0 ? 'Atualizar' : 'Adicionar')}
            </Button>
        </div>
    </Modal>
};
