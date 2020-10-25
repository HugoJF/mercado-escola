import React         from "react";
import {ProductType} from "../models/products";
import {Product}     from "./Product";

interface ProductListParameters {
    products: ProductType[];
}

export const ProductList: React.FC<ProductListParameters> = ({products}) => {
    return <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        {products.map(product =>
            <Product key={product.id} url={`/produtos/${product.id}`} product={product}/>
        )}
    </div>
};
