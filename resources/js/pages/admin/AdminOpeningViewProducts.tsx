import React, {useEffect, useState} from "react";
import {OpeningType}                from "../../models/openings";
import {useProducts}                from "../../selectors";
import {HeightTransitioner}         from "../../components/ui/HeightTransitioner";
import {Box}                        from "../../components/ui/Box";
import {Skeleton}                   from "../../components/ui/Skeleton";
import {ImageHolder}                from "../../components/ui/ImageHolder";
import {Toggle}                     from "../../components/ui/Toggle";
import {useDispatch}                from "react-redux";
import {Dispatch}                   from "../../store";

interface AdminOpeningViewProducts {
    opening: OpeningType;
}

export const AdminOpeningViewProducts: React.FC<AdminOpeningViewProducts> = ({opening}) => {
    const dispatch = useDispatch<Dispatch>();
    const products = useProducts();

    useEffect(() => {
        dispatch.products.index();
        dispatch.openings.index();
    }, []);

    // TODO: fix this
    if (!opening) return <></>;

    return <div className="px-4 py-4 space-y-6">
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
                                alt={name}
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
                                onToggle={() => opening.products.includes(product.id)
                                    ?
                                    dispatch.openings.removeProduct({openingId: opening.id, productId: product.id})
                                    :
                                    dispatch.openings.addProduct({openingId: opening.id, productId: product.id})
                                }
                            />
                        </div>
                    </Box>
                </HeightTransitioner>
            ))}
        </div>
    </div>
};
