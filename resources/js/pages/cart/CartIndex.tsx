import React, {useEffect, useState}                                              from "react";
import {Link, useHistory}                                                        from "react-router-dom";
import {Button}                                                                  from "../../components/Button";
import {Title}                                                                   from "../../components/Title";
import {Calendar, Check, ChevronRight, Edit, MapPin, ShoppingBag, User, XSquare} from "react-feather";
import {useAddresses, useCart, useProducts}                                      from "../../selectors";
import {useDispatch}                                                             from "react-redux";
import {Dispatch}                                                                from "../../store";
import {ProductType}                                                             from "../../models/products";
import {PriceFormatter}                                                          from "../../components/PriceFormatter";
import {FlatButton}                                                              from "../../components/FlatButton";
import {Modal}                                                                   from "../../components/Modal";


export const CartIndex: React.FC = ({children}) => {
    const dispatch = useDispatch<Dispatch>();
    const history = useHistory();
    const addresses = useAddresses();
    const products = useProducts();
    const cart = useCart();
    const [total, setTotal] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch.products.index();
    });

    useEffect(() => {
        setTotal(cartProducts()
            .map(({product, amount}) => (product.quantity_cost * amount))
            .reduce((acc, value) => acc + value, 0)
        )
    }, [cart.items]);

    function cartProducts() {
        return Object.entries(cart.items).map(([productId, amount]) => ({
            product: products.products[parseInt(productId)],
            amount,
        }));
    }

    function eachCart(transformer: (product: { product: ProductType, amount: number }) => any): any[] {
        return cartProducts().map(transformer);
    }

    function remove(productId: number) {
        dispatch.cart.remove(productId);
    }

    const address = cart.address_id && addresses.addresses[cart.address_id];

    return <>
        <div className="flex flex-col justify-around min-h-full">
            <Title>Carrinho</Title>

            <div className="border-b border-gray-200">
                {eachCart(({product, amount}) => (
                    <div className="flex my-8">
                        <div className="flex flex-shrink-0 items-center w-24 h-20 rounded-lg">
                            <img
                                src={`https://picsum.photos/seed/${product.id}/500/300`}
                                className="bg-gray-300 shadow-md rounded-lg"
                            />
                        </div>
                        <div className="px-4 flex-grow">
                            <h3 className="text-xl font-medium">{product.title}</h3>
                            <p className="text-gray-500">{amount} {product.quantity_type}</p>
                            <p className="mt-2 text-secondary-500 font-medium">
                                <PriceFormatter cents price={amount * product.quantity_cost}/>
                            </p>
                        </div>
                        <div className="flex items-center">
                            <Link to={`/produtos/${product.id}`}>
                                <Edit className="ml-8 text-gray-500 cursor-pointer"/>
                            </Link>
                            <XSquare
                                className="ml-8 text-red-600 cursor-pointer"
                                onClick={() => remove(product.id)}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="my-8 flex justify-between items-baseline text-xl">
                <span className="text-gray-500">Valor total</span>
                <span className="text-secondary-500 font-medium">
                    <PriceFormatter cents price={total}/>
                </span>
            </div>

            <Title>Opções de entrega</Title>
            <div className="mt-2">
                <FlatButton onClick={() => setOpen(true)}>
                    <span className="flex-grow">Selecionar entrega</span>
                    <ChevronRight className="flex-shrink-0 ml-2 text-gray-500"/>
                </FlatButton>
            </div>

            <Modal open={open} onClose={() => setOpen(false)}>
                <h1 className="text-center text-lg font-medium">Select option</h1>
                <p className="text-center text-gray-500">Prices and menu items may vary</p>
                <div className="mt-2 border-t border-gray-300">
                    <div className="flex items-center px-4 py-6 border-b last:border-b-0 border-gray-100">
                        <ShoppingBag className="mr-4"/>
                        <span className="flex-grow text-lg font-medium">Delivery</span>
                        <Check size={15} strokeWidth={5} className="text-green-500"/>
                    </div>
                    <div className="flex items-center px-4 py-6 border-b last:border-b-0 border-gray-100">
                        <User className="mr-4"/>
                        <span className="flex-grow text-lg font-medium">Pickup</span>
                    </div>
                </div>
                <div className="mt-4 px-2">
                    <button
                        onClick={() => setOpen(false)}
                        className="w-full py-3 text-white text-lg font-medium bg-gray-800"
                    >
                        Done
                    </button>
                </div>
            </Modal>

            <Title>Endereço de entrega</Title>

            <Link to="/carrinho/endereco" className="mt-2 mb-6 py-2 flex items-center">
                {address ?
                    <>
                        <MapPin className="flex-shrink-0 mr-4 text-gray-500"/>
                        <p className="text-gray-500">
                            {[address.complement, address.address, address.number].join(' ')}
                        </p>
                        <Edit className="ml-4 flex-shrink-0 text-gray-500"/>
                    </>
                    :
                    <FlatButton onClick={() => history.push('/carrinho/endereco')}>
                        <span className="flex-grow">Selecionar um endereço</span>
                        <ChevronRight className="flex-shrink-0 ml-2 text-gray-500"/>
                    </FlatButton>
                }
            </Link>

            <Title>Data de entrega</Title>

            <div className="mt-2 mb-6 py-2 flex items-center">
                <Calendar className="mr-4 text-gray-500"/>
                <p className="text-gray-500">
                    <span className="mr-1 text-secondary-500 font-medium">22/09/2020</span>entre 10h e 16h
                </p>
            </div>

            <Button>
                <Link to="/pedidos/1/">
                    Finalizar pedido
                </Link>
            </Button>
        </div>
    </>
};
