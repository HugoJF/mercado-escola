import React, {useEffect}   from "react";
import {OpeningType}        from "../../../types/openings";
import {useProducts}        from "../../../selectors";
import {HeightTransitioner} from "../../../components/ui/HeightTransitioner";
import {Box}                from "../../../components/ui/Box";
import {Skeleton}           from "../../../components/ui/Skeleton";
import {ImageHolder}        from "../../../components/ui/ImageHolder";
import {Toggle}             from "../../../components/ui/Toggle";
import {useDispatch}        from "react-redux";
import {Dispatch}           from "../../../store";
import {Title}              from "../../../components/ui/Title";
import {ProductType}        from "../../../types/products";

export type AdminOpeningViewProductsProps = {
    opening: OpeningType;
}

export const AdminOpeningViewProducts: React.FC<AdminOpeningViewProductsProps> = ({opening}) => {
    const dispatch = useDispatch<Dispatch>();
    const products = useProducts();

    useEffect(() => {
        dispatch.products.index();
        dispatch.openings.index();
    }, []);

    async function handleProductToggle(product: ProductType) {
        if (opening.products.includes(product.id)) {
            await dispatch.openings.removeProduct({openingId: opening.id, productId: product.id});
            dispatch.toasts.add({
                title: 'Produto removido!',
                description: `${product.name} foi removido da abertura`
            });
        } else {
            await dispatch.openings.addProduct({openingId: opening.id, productId: product.id});
            dispatch.toasts.add({
                title: 'Produto adicionado!',
                description: `${product.name} foi adicionado à abertura`
            });
        }
    }

    // TODO: fix this
    if (!opening) return <></>;

    return <div className="px-4 py-4 space-y-6">
        <div className="space-y-3">
            <Title>Produtos habilitados na abertura</Title>
            <Title sub>Os produtos selecionados abaixo estarão disponíveis para todos os clientes adicionarem em seus pedidos.</Title>
        </div>

        <div className="divide-y divide-gray-200">
            {Object.values(products.products).map(product => (
                <HeightTransitioner key={product.id}>
                    <Box
                        key={product.id}
                    >
                        {/* Thumbnail of first image */}
                        <div className="w-1/4 mr-4">
                            <ImageHolder
                                src={Object.values(product.media ?? [])?.[0]}
                                alt={product.name}
                            />
                        </div>

                        {/* Name */}
                        <div className="flex-grow">
                            <h2 className="text-sm">
                                {product.name || <Skeleton className="w-full"/>}
                            </h2>
                        </div>

                        {/* Selected toggle */}
                        <div>
                            <Toggle
                                checked={opening.products.includes(product.id)}
                                onToggle={() => handleProductToggle(product)}
                            />
                        </div>
                    </Box>
                </HeightTransitioner>
            ))}
        </div>
    </div>
};
