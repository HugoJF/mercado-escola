import {FieldValues, useController} from "react-hook-form";
import React from "react";
import {FormProps} from "@type/forms";

export const QuantityType = <T extends FieldValues>({name, control}: FormProps<T>) => {
    const {field: {value: fieldValue, onChange}} = useController({
        name: name,
        control: control,
    });
    return <div className="grid grid-cols-2 mb-8">
        <div>
            <input
                className="appearance-none peer sr-only"
                id="type-unit"
                type="radio"
                value="unit"
                onChange={onChange}
                checked={fieldValue === "unit"}
            />
            <label
                className="duration-150 block py-4
                        peer-checked:bg-blue-500 peer-checked:text-white
                        text-lg text-center font-medium hover:bg-gray-200
                        border border-l-0 border-gray-300 rounded-l-lg cursor-pointer"
                htmlFor="type-unit"
            >
                Por unidade
            </label>
        </div>

        <div>
            <input
                className="appearance-none peer sr-only"
                id="type-weight"
                type="radio"
                value="weight"
                onChange={onChange}
                checked={fieldValue === 'weight'}
            />
            <label
                className="duration-150 block py-4
                        peer-checked:bg-blue-500 peer-checked:text-white
                        text-lg text-center font-medium hover:bg-gray-200
                        border border-l-0 border-gray-300 rounded-r-lg cursor-pointer"
                htmlFor="type-weight"
            >
                Por peso
            </label>
        </div>
    </div>
};
