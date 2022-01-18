import React from "react";
import {Control} from "react-hook-form";
import {QuantityCost} from "~/forms/fields/QuantityCost";
import {UnitNamePlural} from "~/forms/fields/UnitNamePlural";
import {UnitNameSingular} from "~/forms/fields/UnitNameSingular";
import {ProductProperties} from "@type/products";

type Props = {
    control: Control<ProductProperties>,
}

export const ProductFormUnit: React.FC<Props> = ({control}) => {
    return <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
            <UnitNameSingular name="unit_name_singular" control={control}/>
        </div>

        <div>
            <UnitNamePlural name="unit_name_plural" control={control}/>
        </div>

        <div>
            <QuantityCost name="quantity_cost" control={control} label="Preço da unidade"/>
        </div>
    </div>
};
