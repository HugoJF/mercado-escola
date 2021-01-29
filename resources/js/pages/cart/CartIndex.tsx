import React                                                                       from "react";
import {Link}                                                                      from "react-router-dom";
import {Button}                                                                    from "../../components/ui/Button";
import {Title}                                                                     from "../../components/ui/Title";
import {AlertTriangle, Calendar, ChevronRight, Edit, MapPin, ShoppingBag, XSquare} from "react-feather";
import {ProductType}                                                               from "../../models/products";
import {PriceFormatter}                                                            from "../../components/ui/PriceFormatter";
import {ShippingOptionActionMenu}                                                  from "../../action-menus/ShippingOptionActionMenu";
import classNames                                                                  from "classnames";
import {PagePadding}                                                               from "../../containers/PagePadding";
import {format, parseISO}                                                          from "date-fns";
import {AddressType}                                                               from "../../models/addresses";
import {OpeningType}                                                               from "../../models/openings";
import {ProductListSummary}                                                        from "../../components/products/ProductListSummary";

export type CartIndexProps = {
    address: AddressType | null;
    opening: OpeningType;
    products: ProductType[];
    quantities: { [productId: number]: number };
    onRemove: (product: ProductType) => void;
    setShippingOptionsOpen: (open: boolean) => void;
    shippingOptionsOpen: boolean;
    handleShippingChanged: (delivery: boolean) => void;
    total: number;
    delivery: boolean;
    handleOrderStore: () => void;
    loading: boolean;
}

export const CartIndex: React.FC<CartIndexProps>
    = ({address, opening, products, quantities, onRemove, handleShippingChanged, shippingOptionsOpen, setShippingOptionsOpen, total, delivery, handleOrderStore, loading}) => {
    return <PagePadding>
        <div className="flex flex-col justify-around min-h-full">
            <Title>Carrinho</Title>

            {/* Cart products */}
            <div className="border-b border-gray-200">
                {!Object.values(products).length &&
                <h2 className="py-6 text-lg text-gray-500 text-center tracking-wide">
                    Carrinho vazio!
                </h2>}

                <ProductListSummary products={products} quantities={quantities}>
                    {(product, amount) => <>
                        <Link to={`/produtos/${product.id}`}>
                            <Edit className="text-gray-500 cursor-pointer"/>
                        </Link>
                        <XSquare
                            className="text-red-600 cursor-pointer"
                            onClick={() => onRemove(product)}
                        />
                    </>}
                </ProductListSummary>
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
                onClose={() => setShippingOptionsOpen(false)}
                isDelivery={delivery}
                onChange={handleShippingChanged}
            />

            {/* Delivery address */}
            {delivery && <>
                <Title>Endereço de entrega</Title>

                <Link to="/carrinho/endereco" className={
                    classNames('mt-2 mb-8 py-2 flex items-center', {
                        'text-gray-500': address,
                    })
                }>
                    {address ?
                        <MapPin className="mr-3 flex flex-shrink-0 text-gray-500"/>
                        :
                        <AlertTriangle className="animate-ping mr-3 flex flex-shrink-0 text-red-500"/>
                    }
                    <p className="flex-grow text-gray-500">
                        {address ?
                            [address.complement, address.address, address.number].join(' ')
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
                    <span className="mr-1 text-secondary-500 font-medium">
                        {format(parseISO(opening.delivers_at), 'dd/LL/yyyy')}
                    </span>
                    a partir das {format(parseISO(opening.delivers_at), 'HH:mm')}
                </p>
            </div>

            <Button loading={loading} onClick={handleOrderStore}>
                Finalizar pedido
            </Button>
        </div>
    </PagePadding>
};
