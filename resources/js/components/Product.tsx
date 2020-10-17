import React            from "react";
import {Link}           from "react-router-dom";
import {PriceFormatter} from "./PriceFormatter";
import {ProductType}    from "../models/products";

interface ProductParameters {
    product: ProductType
    url: string,
}

export const Product: React.FC<ProductParameters> = ({product, url}) => {
    const {title, quantity_cost, quantity_type} = product;

    return <Link
        to={url}
        className="transition-shadow duration-150
            p-6 bg-white rounded-lg
            cursor-pointer shadow hover:shadow-md"
    >
        <img
            className="w-full mb-4 shadow-md rounded-lg"
            src={`https://picsum.photos/seed/${product.id}/300/300`}
            alt={title}
        />
        <h3 className="text-xl text-gray-800 font-medium">{title}</h3>
        <h4 className="text-lg">
            <span className="text-secondary-400 text-xl font-medium">
                <PriceFormatter cents price={quantity_cost}/>
            </span>
            <small className="ml-1 text-gray-500 font-thin tracking-tight">{quantity_type}</small>
        </h4>
    </Link>
};
