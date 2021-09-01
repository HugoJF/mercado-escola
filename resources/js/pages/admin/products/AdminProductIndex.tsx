import React, {ChangeEvent, useMemo, useState} from "react";
import {Plus} from "react-feather";
import {FlatButton} from "@components/ui/FlatButton";
import {ProductType} from "@type/products";
import useNavigation from "@hooks/useNavigation";
import {AdminProductList} from "./AdminProductList";
import {Empty} from "@components/ui/Empty";
import {Title} from "@components/ui/Title";
import {PagePadding} from "@containers/PagePadding";
import isEmpty from "lodash.isempty";
import {Input} from "@components/form/Input";

export type AdminProductIndexProps = {
    products: ProductType[];
    expanded?: number;
    onClick?: (product: ProductType) => void;
    onDelete?: (product: ProductType) => void;
}

export const AdminProductIndex: React.FC<AdminProductIndexProps>
    = ({products, expanded, onClick, onDelete}) => {
    const [filter, setFilter] = useState('');
    const {bindGo} = useNavigation();

    const filteredProducts = useMemo<ProductType[]>(() => {
        if (filter === '') {
            return products;
        }

        return products.filter(product => product.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    }, [products, filter])

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        setFilter(e.currentTarget.value);
    }

    return <PagePadding className="space-y-4">
        <Title>Lista de produtos</Title>

        <Input
            name="filter"
            label="Filtrar por nome"
            inputProps={{
                onChange: handleOnChange,
                autoComplete: "off"
            }}
        />

        {isEmpty(products) && <Empty
            title="Nenhum produto!"
            description="Nenhum produto foi registrado no sistema"
        />}

        {isEmpty(filteredProducts) && filter !== '' && <Empty
            title="Nenhum produto!"
            description={`Nenhum produto encontrado com nome "${filter}"`}
        />}

        <AdminProductList
            /* FIXME: this is a temporary workaround */
            products={filteredProducts.sort((a, b) => a.name.localeCompare(b.name))}
            expanded={expanded}
            onClick={onClick}
            onDelete={onDelete}
        />

        <FlatButton
            onClick={bindGo('./novo')}
            text="Adicionar produto"
            icon={Plus}
        />
    </PagePadding>
};
