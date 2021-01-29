import React                             from "react";
import {ProductType}                     from "../../models/products";
import {ImageHolder}                     from "../ui/ImageHolder";
import {QuantityTypes, QuantityTypeText} from "../ui/QuantityTypeText";
import {PriceFormatter}                  from "../ui/PriceFormatter";

export type ProductListSummaryProps = {
    products: ProductType[];
    quantities: { [productId: number]: number };
    children?: (product: ProductType, amount: number) => string|React.ReactNode;
}

export const ProductListSummary: React.FC<ProductListSummaryProps> = ({products, quantities, children}) => {
    return <div className="flex flex-col space-y-4">
        {products.map(product => (
            <div key={product.id} className="flex items-center">
                <div className="w-4/12">
                    <ImageHolder
                        src={Object.values(product.media)?.[0]}
                    />
                </div>
                <div className="px-4 flex-grow">
                    <h3 className="text-lg font-medium">{product.name}</h3>
                    <div className="flex">
                        <div className="flex-grow">
                            <p className="text-gray-500">
                                <QuantityTypeText
                                    type={product.quantity_type as QuantityTypes}
                                    quantity={quantities[product.id]}
                                    showTotal
                                />
                            </p>
                            <p className="mt-2 text-secondary-500 font-medium">
                                <PriceFormatter cents price={quantities[product.id] * product.quantity_cost}/>
                            </p>
                        </div>
                        {children && <div className="flex items-center space-x-4">
                            {children(product, quantities[product.id])}
                        </div>}
                    </div>
                </div>
            </div>
        ))}

    </div>
};
