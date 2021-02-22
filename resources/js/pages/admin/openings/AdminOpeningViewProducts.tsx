import React                              from "react";
import {OpeningType, OpeningWithProducts} from "../../../types/openings";
import {HeightTransitioner}               from "../../../components/ui/HeightTransitioner";
import {Box}                              from "../../../components/ui/Box";
import {Skeleton}                         from "../../../components/ui/Skeleton";
import {ImageHolder}                      from "../../../components/ui/ImageHolder";
import {Toggle}                           from "../../../components/ui/Toggle";
import {useDispatch}                      from "react-redux";
import {Dispatch}                         from "../../../store";
import {Title}                            from "../../../components/ui/Title";
import {ProductType}              from "../../../types/products";
import {useOpeningsAddProduct}    from "../../../mutations/useOpeningsAddProduct";
import {useOpeningsRemoveProduct} from "../../../mutations/useOpeningsRemoveProduct";

export type AdminOpeningViewProductsProps = {
    opening: OpeningType<OpeningWithProducts>;
}

export const AdminOpeningViewProducts: React.FC<AdminOpeningViewProductsProps> = ({opening}) => {
    const dispatch = useDispatch<Dispatch>();
    const openingAddProduct = useOpeningsAddProduct();
    const openingRemoveProduct = useOpeningsRemoveProduct();

    async function handleProductToggle(product: ProductType) {
        if (opening.products.includes(product.id)) {
            await openingRemoveProduct.mutateAsync({openingId: opening.id, productId: product.id});
            dispatch.toasts.add({
                title: 'Produto removido!',
                description: `${product.name} foi removido da abertura`
            });
        } else {
            await openingAddProduct.mutateAsync({openingId: opening.id, productId: product.id});
            dispatch.toasts.add({
                title: 'Produto adicionado!',
                description: `${product.name} foi adicionado à abertura`
            });
        }
    }

    return <div className="px-4 py-4 space-y-6">
        <div className="space-y-3">
            <Title>Produtos habilitados na abertura</Title>
            <Title sub>Os produtos selecionados abaixo estarão disponíveis para todos os clientes adicionarem em seus pedidos.</Title>
        </div>

        <div className="divide-y divide-gray-200">
            {opening.products.map(product => (
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
