import React from "react";
import {Control} from "react-hook-form";
import {ProductProperties} from "@type/products";
import {WeightIncrement} from "~/forms/fields/WeightIncrement";
import {QuantityCost} from "~/forms/fields/QuantityCost";

type ProductFormWeightProps = {
    control: Control<ProductProperties>,
}

export const ProductFormWeight: React.FC<ProductFormWeightProps> = ({control}) => {
    return <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
            <WeightIncrement name="weight_increment" control={control}/>
        </div>

        <div>
            <QuantityCost name="quantity_cost" control={control} label="Preço por quilograma"/>
        </div>
    </div>
};
