import React                  from 'react';
import {Button}               from "../../components/Button";
import {useParams}            from "react-router";
import {useCart, useProducts} from "../../selectors";
import {PriceFormatter}       from "../../components/PriceFormatter";
import {useDispatch}          from "react-redux";
import {Dispatch}             from "../../store";

export const ProductShow: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const params = useParams<{ productId: string }>();
    const cart = useCart();
    const products = useProducts();

    const productId = parseInt(params.productId);
    const product = products.products[productId];
    const cartAmount = cart.items[productId];

    function add() {
        dispatch.cart.add({
            product: productId,
            amount: (cartAmount || 0) + 1
        });
    }

    function subtract() {
        if (cartAmount === 1) {
            dispatch.cart.remove(productId);
        } else {
            dispatch.cart.add({
                product: productId,
                amount: +cartAmount - 1
            });
        }
    }

    if (!product) return null;

    return <>
        <div className="flex flex-col justify-around min-h-full">
            <img
                src={`https://picsum.photos/seed/${product.id}/200/300`}
                className="bg-gray-300 shadow-md rounded-lg"
            />

            <div>
                <h2 className="mb-4 text-2xl tracking-wide">Descrição</h2>

                <p className="px-2 text-sm text-gray-500 leading-4">{product.description}</p>
            </div>

            <div className="my-8 flex items-center justify-between">
                <div className="flex items-baseline">
                    <span className="text-3xl text-secondary-500 font-medium">
                        <PriceFormatter cents price={product.quantity_cost}/>
                    </span>
                    <span className="ml-1 text-gray-500">
                        / {product.quantity_type}
                    </span>
                </div>
                {cartAmount && <div className="flex items-center">
                    <div className="mx-4 text-2xl font-medium">{cart.items[productId]} {product.quantity_type}</div>
                </div>}
            </div>

            {!cartAmount ?
                <Button onClick={add}>
                    Adicionar ao carrinho
                </Button>
                :
                <div className="grid grid-cols-2 gap-8">
                    <div
                        className="transition-colors duration-150
                            py-3 flex justify-center items-center
                            hover:bg-gray-200 text-gray-400 text-2xl font-bold
                            border border-gray-300 rounded-lg cursor-pointer"
                        onClick={subtract}
                    >
                        <span className="pb-1">-</span>
                    </div>
                    <div
                        className="transition-colors duration-150
                            py-3 flex justify-center items-center
                            hover:bg-gray-200 text-gray-400 text-2xl font-bold
                            border border-gray-300 rounded-lg cursor-pointer"
                        onClick={add}
                    >
                        <span className="pb-1">+</span>
                    </div>
                </div>
            }

        </div>
    </>

}
