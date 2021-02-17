import React         from "react";
import {ProductType} from "../../types/products";
import {Product}     from "./Product";

export type ProductListProps = {
    products: ProductType[];
}

export const ProductList: React.FC<ProductListProps> = ({products}) => {
    return <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        {products.map(product =>
            <Product key={product.id} url={`/produtos/${product.id}`} product={product}/>
        )}
    </div>
};
