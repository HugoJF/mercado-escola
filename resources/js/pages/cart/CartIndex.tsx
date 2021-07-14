import React from "react";
import {Link} from "react-router-dom";
import {Button} from "../../components/ui/Button";
import {Title} from "../../components/ui/Title";
import {AlertTriangle, Calendar, ChevronRight, Edit, MapPin, ShoppingBag} from "react-feather";
import {ProductType} from "../../types/products";
import {PriceFormatter} from "../../components/ui/PriceFormatter";
import {ShippingOptionActionMenu} from "../../action-menus/ShippingOptionActionMenu";
import clsx from 'clsx';
import {PagePadding} from "../../containers/PagePadding";
import {CartType} from "../../types/cart";
import {ProductListSummary} from "../../components/products/ProductListSummary";
import {Date} from "../../components/ui/Date";
import useNavigation from "../../hooks/useNavigation";

export type CartIndexProps = {
    cart: CartType;
    onRemove: (product: ProductType) => void;
    setShippingOptionsOpen: (open: boolean) => void;
    shippingOptionsOpen: boolean;
    onShippingChanged: (delivery: boolean) => void;
    onDeliverySelected: (isDelivery: boolean) => void;
    onOrderStore: () => void;
    pending: boolean;
    delivery: boolean;
}

export const CartIndex: React.FC<CartIndexProps>
    = ({cart, onRemove, delivery, onShippingChanged, shippingOptionsOpen, setShippingOptionsOpen, onDeliverySelected, onOrderStore, pending}) => {
    const {bindGo} = useNavigation();
    const total = cart.cost;

    function handleOnClose() {
        setShippingOptionsOpen(false);
        onDeliverySelected(delivery);
    }

    return <PagePadding>
        <div className="flex flex-col justify-around min-h-full">
            <Title>Carrinho</Title>

            {/* Cart products */}
            <div className="pb-4 border-b border-gray-200">
                {!Object.values(cart.products).length &&
                <h2 className="py-6 text-lg text-gray-500 text-center tracking-wide">
                    Carrinho vazio!
                </h2>}

                <ProductListSummary
                    products={cart.products}
                >
                    {(product) => <Edit
                        className="text-gray-400"
                        onClick={bindGo(`/produtos/${product.id}`)}
                    />}
                </ProductListSummary>
            </div>

            <Link
                className="block py-4 mb-8 text-center text-base text-secondary-500 font-medium border-b border-gray-200"
                to="/home"
            >
                Adicionar mais itens
            </Link>

            {/* Delivery fee */}
            {cart.address && <div className="mb-4 flex justify-between items-baseline">
                <span className="text-gray-500">Taxa de entrega</span>
                <span className="text-secondary-500">
                    <PriceFormatter cents price={cart.opening.delivery_fee}/>
                </span>
            </div>}


            {/* Total cost */}
            <div className="mb-8 flex justify-between items-baseline text-xl">
                <span className="text-gray-700">Valor total</span>
                <span className="text-secondary-500 font-medium">
                    <PriceFormatter cents price={total}/>
                </span>
            </div>

            {/* Shipping options */}
            <Title>Opções de entrega</Title>
            <div className="mt-2 mb-8 py-2 flex items-center" onClick={() => setShippingOptionsOpen(true)}>
                <ShoppingBag className="mr-3 flex flex-shrink-0 text-gray-500"/>
                <div className="flex-grow text-gray-500">
                    {delivery ?
                        'Entregar no endereço'
                        :
                        'Retirar pessoalmente'
                    }
                </div>
                <ChevronRight className="ml-3 flex-shrink-0 text-gray-500"/>
            </div>

            <ShippingOptionActionMenu
                open={shippingOptionsOpen}
                onClose={handleOnClose}
                isDelivery={delivery}
                onChange={onShippingChanged}
            />

            {/* Delivery address */}
            {delivery && <>
                <Title>Endereço de entrega</Title>

                <Link
                    to="/carrinho/endereco"
                    className={clsx(
                        'mt-2 mb-8 py-2 flex items-center', {
                            'text-gray-500': cart.address,
                        }
                    )}
                >
                    {cart.address ?
                        <MapPin className="mr-3 flex flex-shrink-0 text-gray-500"/>
                        :
                        <AlertTriangle className="animate-ping mr-3 flex flex-shrink-0 text-red-500"/>
                    }
                    <p className="flex-grow text-gray-500">
                        {cart.address ?
                            [cart.address.complement, cart.address.address, cart.address.number].join(' ')
                            :
                            'Selecionar um endereço'
                        }
                    </p>
                    <ChevronRight className="ml-3 flex-shrink-0 text-gray-500"/>
                </Link>
            </>}

            {/* Delivery date */}
            <Title>Data de entrega</Title>

            <div className="mt-2 mb-8 py-2 flex items-center">
                <Calendar className="mr-4 text-gray-500"/>
                <p className="text-gray-500">
                    <span className="text-secondary-500 font-medium">
                        <Date input={cart.opening.delivers_at} format="dd/LL/yyyy"/>
                    </span>
                    {' '}a partir das{' '}
                    <Date input={cart.opening.delivers_at} format="HH'h'mm'm'"/>
                </p>
            </div>

            <Button
                enabled={cart.products.length > 0}
                loading={pending}
                onClick={onOrderStore}
            >
                Finalizar pedido
            </Button>
        </div>
    </PagePadding>
};
