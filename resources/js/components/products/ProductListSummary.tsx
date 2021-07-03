import React from "react";
import {ProductType, WithQuantityPivot} from "../../types/products";
import {ImageHolder} from "../ui/ImageHolder";
import {PriceFormatter} from "../ui/PriceFormatter";
import {ProductQuantity} from "./helpers/ProductQuantity";
import {ProductQuantityCost} from "./helpers/ProductQuantityCost";

export type ProductListSummaryProps = {
    products: ProductType<WithQuantityPivot>[];
    children?: (product: ProductType, quantity: number) => string | React.ReactNode;
}

export const ProductListSummary: React.FC<ProductListSummaryProps> = ({products, children}) => {
    return <div className="flex flex-col space-y-4">
        {products.map(product => (
            <div key={product.id} className="flex items-center">
                <div className="w-4/12">
                    <ImageHolder
                        src={Object.values(product.media_links)[0]}
                    />
                </div>
                <div className="px-4 flex-grow">
                    <h3 className="text-lg font-medium">{product.name}</h3>
                    <div className="flex">
                        <div className="flex-grow">
                            <p className="text-gray-500">
                                <ProductQuantity
                                    product={product}
                                    quantity={product.pivot.quantity}
                                >{({total, text}) => <>
                                    {total} {text}
                                </>}</ProductQuantity>
                            </p>
                            <p className="mt-2 text-secondary-500 font-medium">
                                <ProductQuantityCost
                                    product={product}
                                    quantity={product.pivot.quantity}
                                    quantityCostOverride={product.pivot.quantity_cost}
                                >
                                    {({cost}) => <PriceFormatter cents price={cost}/>}
                                </ProductQuantityCost>
                            </p>
                        </div>
                        {children && <div className="flex items-center space-x-4">
                            {children(product, product.pivot.quantity)}
                        </div>}
                    </div>
                </div>
            </div>
        ))}

    </div>
};
