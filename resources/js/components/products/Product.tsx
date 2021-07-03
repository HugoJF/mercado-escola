import React from "react";
import {Link} from "react-router-dom";
import {PriceFormatter} from "../ui/PriceFormatter";
import {ProductType} from "../../types/products";
import {ImageHolder} from "../ui/ImageHolder";
import {PlusCircle} from "react-feather";
import {ProductCost} from "./helpers/ProductCost";

export type ProductProps = {
    product: ProductType;
    url: string;
}

export const Product: React.FC<ProductProps> = ({product, url}) => {
    const {name} = product;

    return <Link
        to={url}
        className="transition-shadow duration-150
            p-4 bg-white rounded-lg
            cursor-pointer shadow hover:shadow-md"
    >
        <div className="mb-2">
            <ImageHolder
                src={Object.values(product.media_links)[0]}
                alt={name}
            />
        </div>

        <h3 className="text-xl text-gray-800 font-medium">
            {name}
        </h3>

        <h4 className="text-lg">
            <ProductCost product={product}>
                {({cost, text}) => <>
                    <span className="text-secondary-400 text-xl font-medium">
                        <PriceFormatter cents price={cost}/>
                    </span>
                    <small className="ml-px text-gray-500 tracking-tight">
                        /{text}
                    </small>
                </>}
            </ProductCost>
        </h4>

        <div className="flex justify-center mt-4 space-x-2 text-gray-400 text-sm">
            <PlusCircle/>
            <span>Adicionar ao carrinho</span>
        </div>
    </Link>
};
