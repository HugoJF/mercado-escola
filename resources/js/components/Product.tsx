import React  from "react";
import {Link} from "react-router-dom";

interface ProductParameters {
    url: string;
    image: string;
    name: string;
    cost: number;
    quantity: string;
}

const formatter = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'});

export const Product: React.FC<ProductParameters> = ({name, image, cost, quantity, url}) => {
    return <Link
        to={url}
        className="transition-shadow duration-150
            p-6 mx-4 bg-white rounded-lg
            cursor-pointer shadow hover:shadow-md"
    >
        <div
            className="mx-auto mb-4 h-48 w-48 rounded-full bg-gray-200 bg-cover shadow-md"
            style={{backgroundImage: `url(${image})`}}
        />
        <h3 className="text-xl text-gray-800 font-medium">{name}</h3>
        <h4 className="text-lg">
            <span className="text-secondary-400 text-xl font-medium">
                {formatter.format(cost)}
            </span>
            <small className="ml-1 text-gray-500 font-thin tracking-tight">{quantity}</small>
        </h4>
    </Link>
};
