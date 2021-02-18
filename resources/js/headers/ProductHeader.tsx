import React           from 'react';
import {Heart}         from "react-feather";
import {BackAndCart}   from "./partials/BackAndCart";
import {HeaderWrapper} from "./partials/HeaderWrapper";
import classNames      from 'classnames';
import {ProductType}   from "../types/products";

export type ProductHeaderProps = {
    product: ProductType;
    favorite: boolean;
    onToggleFavorite: () => void;
}

export const ProductHeader: React.FC<ProductHeaderProps> = ({product, favorite, onToggleFavorite}) => {
    return <HeaderWrapper>
        <BackAndCart/>

        <div className="flex justify-between items-center mt-12 px-6">
            <h2 className="text-2xl font-medium truncate leading-none">{product.name}</h2>
            <div
                className={classNames(
                    `transition-colors duration-50`,
                    {
                        'text-red-500 ': favorite,
                    }
                )}
                onClick={onToggleFavorite}
            >
                <Heart
                    className="transition-colors duration-150 fill-current"
                    fillOpacity={favorite ? 100 : 0}
                    size={30}
                />
            </div>
        </div>
    </HeaderWrapper>
};
