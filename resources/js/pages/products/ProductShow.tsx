import React                             from 'react';
import {Button}                          from "../../components/ui/Button";
import {PriceFormatter}                  from "../../components/ui/PriceFormatter";
import * as ProductQuantityConfig        from "../../configs/ProductQuantityConfig";
import {QuantityTypes, QuantityTypeText} from "../../components/ui/QuantityTypeText";
import {ImageHolder}                     from "../../components/ui/ImageHolder";
import {Link}                            from "react-router-dom";
import {PagePadding}                     from "../../containers/PagePadding";
import {ProductType}                     from "../../types/products";

export type ProductShowProps = {
    product: ProductType;
    quantity: number;
    handleAdd: () => void;
    handleSubtract: () => void;
}

export const ProductShow: React.FC<ProductShowProps> = ({product, quantity, handleAdd, handleSubtract}) => {
    const config = ProductQuantityConfig[product.quantity_type];
    const total = quantity * config.step;
    const text = total === 1 ? config.singular : config.plural;

    return <PagePadding className="flex flex-col justify-around min-h-full">
        {/* Images */}
        <div className="lg:px-48 xl:px-64 w-full">
            <ImageHolder
                src={Object.values(product.media_links ?? [])?.[0]}
            />
        </div>

        {/* Description */}
        <div className="mt-8">
            <h2 className="mb-4 text-xl tracking-wide">Descrição</h2>

            {product.description && <p className="px-2 text-sm text-gray-500 leading-4">{product.description}</p>}
            {!product.description && <p className="px-2 text-sm text-gray-500 leading-4">Produto sem descrição.</p>}
        </div>

        {/* Price and quantities */}
        <div className="my-8 flex items-center justify-between">
            <div className="flex items-baseline">
                <span className="text-xl text-secondary-500 font-medium">
                    <PriceFormatter cents price={product.quantity_cost * (quantity ?? 1)}/>
                </span>

                {!quantity && <span className="ml-px text-gray-500">
                    /
                    <QuantityTypeText
                        type={product.quantity_type as QuantityTypes}
                    />
                </span>}
            </div>
            {!!quantity && <div className="flex items-center">
                <div className="mx-4 text-xl font-medium">{total} {text}</div>
            </div>}
        </div>

        {/* Cart controls */}
        {!quantity ?
            <Button onClick={handleAdd}>
                Adicionar ao carrinho
            </Button>
            :
            <div className="grid grid-cols-2 gap-8">
                <div
                    className="transition-colors duration-150
                            flex justify-center items-center
                            bg-primary-500 hover:bg-primary-600 text-gray-100 text-4xl font-bold
                            shadow rounded-lg cursor-pointer select-none"
                    onClick={handleSubtract}
                >
                    <span className="pb-1">-</span>
                </div>
                <div
                    className="transition-colors duration-150
                            flex justify-center items-center
                            bg-primary-500 hover:bg-primary-600 text-gray-100 text-4xl font-bold
                            shadow rounded-lg cursor-pointer select-none"
                    onClick={handleAdd}
                >
                    <span className="pb-1">+</span>
                </div>
            </div>
        }

        {/* Cart warning */}
        {!!quantity && <div className="grid grid-cols-2 items-center my-4 divide-x">
            <Link to="/carrinho" className="py-2 px-2 text-center text-gray-500 text-sm tracking-tight">
                Ver no carrinho
            </Link>

            <Link to="/home" className="py-2 px-2 text-center text-gray-500 text-sm tracking-tight">
                Continuar comprando
            </Link>
        </div>}
    </PagePadding>
};
