import React            from 'react';
import {Button}         from "../../components/Button";
import {useParams}      from "react-router";
import {useProducts}    from "../../selectors";
import {PriceFormatter} from "../../components/PriceFormatter";

export const ProductShow: React.FC = () => {
    const params = useParams<{productId: string}>();
    const products = useProducts();

    let product = products.products[parseInt(params.productId)];

    return <>
        <div className="flex flex-col justify-around min-h-full">
            <div
                style={{background: `url(https://picsum.photos/seed/${product.id}/200/300)`}}
                className="h-64 w-64 mx-auto bg-gray-300 rounded-full shadow-md bg-cover"
            />

            <div>
                <h2 className="mb-4 text-2xl tracking-wide">Descrição</h2>

                <p className="px-2 text-sm text-gray-500 leading-4">{product.description}</p>
            </div>

            <div className="my-8 flex items-center justify-between">
                <div className="text-3xl text-secondary-500 font-medium">
                    <PriceFormatter cents price={product.quantity_cost}/>
                </div>
                <div className="flex items-center">
                    <div className="transition-colors duration-150
                    pb-1 flex justify-center items-center w-12 h-12
                    hover:bg-gray-200 text-gray-400 text-2xl font-bold
                    border border-gray-300 rounded-lg cursor-pointer"
                    >
                        -
                    </div>
                    <div className="mx-4 text-2xl font-medium">{product.quantity_type}</div>
                    <div className="transition-colors duration-150
                    pb-1 flex justify-center items-center w-12 h-12
                    hover:bg-gray-200 text-gray-400 text-2xl font-bold
                    border border-gray-300 rounded-lg cursor-pointer"
                    >
                        +
                    </div>
                </div>
            </div>

            <Button>
                Adicionar ao carrinho
            </Button>
        </div>
    </>

}
