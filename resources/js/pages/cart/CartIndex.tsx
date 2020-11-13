import React, {useEffect, useMemo, useState}                        from "react";
import {Link, useHistory}                                           from "react-router-dom";
import {Button}                                                     from "../../components/ui/Button";
import {Title}                                                      from "../../components/ui/Title";
import {Calendar, ChevronRight, Edit, MapPin, ShoppingBag, XSquare} from "react-feather";
import {useAddresses, useCart, useOpenings, useProducts}            from "../../selectors";
import {useDispatch}                                                from "react-redux";
import {Dispatch}                                                   from "../../store";
import {ProductType}                                                from "../../models/products";
import {PriceFormatter}                                             from "../../components/ui/PriceFormatter";
import {ShippingOptionActionMenu}                                   from "../../action-menu/ShippingOptionActionMenu";
import {OrderProductsType}                                          from "../../models/orders";
import {QuantityTypes, QuantityTypeText}                            from "../../components/ui/QuantityTypeText";
import {ImageHolder}                                                from "../../components/ui/ImageHolder";


export const CartIndex: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const history = useHistory();
    const addresses = useAddresses();
    const products = useProducts();
    const cart = useCart();
    const openings = useOpenings();
    const [loading, setLoading] = useState(false);
    const [shippingOptionOpen, setShippingOptionOpen] = useState(false);

    useEffect(() => {
        dispatch.products.index();
    }, []);

    const total = useMemo(() => (cartProducts()
            .map(({product, amount}) => (product.quantity_cost * amount))
            .reduce((acc, value) => acc + value, 0)
    ), [products, cart]);

    function cartProducts() {
        return Object
            .entries(cart.items)
            .map(([productId, amount]) => ({
                product: products.products[parseInt(productId)],
                amount,
            }))
            .filter(entry => entry.product);
    }

    function eachCart(transformer: (product: { product: ProductType, amount: number }) => any): any[] {
        return cartProducts().map(transformer);
    }

    function remove(productId: number) {
        dispatch.cart.remove(productId);
    }

    async function handleStoreOrder() {
        const products: OrderProductsType[] = [];
        setLoading(true);

        for (let [productId, quantity] of Object.entries(cart.items)) {
            products.push({
                product_id: parseInt(productId),
                quantity,
            })
        }

        let order = await dispatch.orders.store({
            address_id: cart.address_id as number,
            opening_id: openings.current as number,
            products,
        });
        dispatch.cart.reset();
        history.push(`/pedidos/${order.id}/finalizado`)
    }

    const address = cart.address_id && addresses.addresses[cart.address_id];

    return <>
        <div className="flex flex-col justify-around min-h-full">
            <Title>Carrinho</Title>

            {/* Cart products */}

            <div className="border-b border-gray-200">
                {!Object.values(cart.items).length &&
                <h2 className="py-6 text-lg text-gray-500 text-center tracking-wide">
                    Carrinho vazio!
                </h2>}
                {eachCart(({product, amount}) => (
                    <div key={product.id} className="flex my-8 items-center">
                        <div className="w-4/12">
                            <ImageHolder
                                src={Object.values(product.media)?.[0]}
                            />
                        </div>
                        <div className="px-4 flex-grow">
                            <h3 className="text-xl font-medium">{product.title}</h3>
                            <div className="flex">
                                <div className="flex-grow">
                                    <p className="text-gray-500">
                                        <QuantityTypeText
                                            type={product.quantity_type as QuantityTypes}
                                            quantity={amount}
                                            showTotal
                                        />
                                    </p>
                                    <p className="mt-2 text-secondary-500 font-medium">
                                        <PriceFormatter cents price={amount * product.quantity_cost}/>
                                    </p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <Link to={`/produtos/${product.id}`}>
                                        <Edit className="text-gray-500 cursor-pointer"/>
                                    </Link>
                                    <XSquare
                                        className="text-red-600 cursor-pointer"
                                        onClick={() => remove(product.id)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Total cost */}

            <div className="my-8 flex justify-between items-baseline text-xl">
                <span className="text-gray-500">Valor total</span>
                <span className="text-secondary-500 font-medium">
                    <PriceFormatter cents price={total}/>
                </span>
            </div>

            {/* Shipping options */}

            <Title>Opções de entrega</Title>
            <div className="mt-2 mb-8 py-2 flex items-center" onClick={() => setShippingOptionOpen(true)}>
                <ShoppingBag className="mr-3 flex flex-shrink-0 text-gray-500"/>
                <div className="flex-grow text-gray-500">
                    {cart.delivery ?
                        'Entregar no endereço'
                        :
                        'Retirar pessoalmente'
                    }
                </div>
                <ChevronRight className="ml-3 flex-shrink-0 text-gray-500"/>
            </div>

            <ShippingOptionActionMenu
                open={shippingOptionOpen}
                onClose={() => setShippingOptionOpen(false)}
                isDelivery={cart.delivery}
                onChange={dispatch.cart.setDelivery}
            />

            {/* Delivery address */}

            {cart.delivery && <>
                <Title>Endereço de entrega</Title>

                <div className="mt-2 mb-8 py-2 flex items-center" onClick={() => history.push('/carrinho/endereco')}>
                    <MapPin className="mr-3 flex flex-shrink-0 text-gray-500"/>
                    <p className="flex-grow text-gray-500">
                        {address ?
                            [address.complement, address.address, address.number].join(' ')
                            :
                            'Selecionar um endereço'
                        }
                    </p>
                    <ChevronRight className="ml-3 flex-shrink-0 text-gray-500"/>
                </div>
            </>}

            {/* Delivery date */}

            <Title>Data de entrega</Title>

            <div className="mt-2 mb-8 py-2 flex items-center">
                <Calendar className="mr-4 text-gray-500"/>
                <p className="text-gray-500">
                    <span className="mr-1 text-secondary-500 font-medium">22/09/2020</span>entre 10h e 16h
                </p>
            </div>

            <Button loading={loading} onClick={handleStoreOrder}>
                Finalizar pedido
            </Button>
        </div>
    </>
};
