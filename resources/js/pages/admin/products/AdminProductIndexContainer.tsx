import React from "react";
import useConfirmMenu from "@hooks/useConfirmMenu";
import {AdminProductIndex} from "./AdminProductIndex";
import {ProductType} from "@type/products";
import {Loading} from "@components/ui/Loading";
import useToggle from "@hooks/useToggle";
import {useProducts} from "@queries/useProducts";
import {useProductDestroy} from "@mutations/useProductDestroy";

export const AdminProductIndexContainer: React.FC = () => {
    const [expanded, setExpanded] = useToggle();
    const [menu, confirm] = useConfirmMenu();

    const {status, data, error, isFetching} = useProducts();
    const productDestroy = useProductDestroy();

    function handleClick(product: ProductType) {
        setExpanded(product.id);
    }

    async function handleDelete(product: ProductType) {
        const confirmed = await confirm({
            title: 'Deletar produto?',
            description: 'Deletar permanentemente o produto do sistema',
            action: 'Deletar',
        });

        if (confirmed) {
            productDestroy.mutate(product.id);
        }
    }

    if (!data) {
        return <Loading/>
    }

    return <>
        {menu}

        {data ?
            <AdminProductIndex
                products={data.data.data}
                expanded={expanded}
                onClick={handleClick}
                onDelete={handleDelete}
            />
            :
            <Loading/>
        }
    </>
};
