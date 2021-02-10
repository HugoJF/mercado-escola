import React, {useState}   from "react";
import {useDispatch}       from "react-redux";
import {Dispatch}          from "../../../store";
import useConfirmMenu      from "../../../hooks/useConfirmMenu";
import {AdminProductIndex} from "./AdminProductIndex";
import {ProductType}       from "../../../models/products";
import {Loading}           from "../../../components/ui/Loading";
import {useQuery}          from "react-query";
import {api}               from "../../../api";

export const AdminProductIndexContainer: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const [open, setOpen] = useState<number | undefined>(undefined);
    const [menu, confirm] = useConfirmMenu();

    // Queries
    const {status, data, error, isFetching} = useQuery('products', api.products.index);

    function handleClick(product: ProductType) {
        if (open === product.id) {
            setOpen(undefined);
        } else {
            setOpen(product.id);
        }
    }

    async function handleDelete() {
        if (!open) {
            return;
        }

        const confirmed = await confirm({
            title: 'Deletar produto?',
            description: 'Deletar permanentemente o produto do sistema',
            action: 'Deletar',
        });

        if (confirmed) {
            dispatch.products.destroy(open);
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
                expanded={open}
                onClick={handleClick}
                onDelete={handleDelete}
            />
            :
            <Loading/>
        }
    </>
};
