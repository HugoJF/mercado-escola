import React, {useState}   from "react";
import useRelativePath     from "../../../hooks/useRelativePath";
import {useDispatch}       from "react-redux";
import {Dispatch}          from "../../../store";
import {useProducts}       from "../../../selectors";
import {useHistory}        from "react-router-dom";
import useConfirmMenu      from "../../../hooks/useConfirmMenu";
import useLoadEffect       from "../../../hooks/useLoadEffect";
import {AdminProductIndex} from "./AdminProductIndex";
import {ProductType}       from "../../../models/products";

export const AdminProductIndexContainer: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const history = useHistory();
    const relative = useRelativePath();
    const products = useProducts();
    const [open, setOpen] = useState<number | undefined>(undefined);
    const [menu, confirm] = useConfirmMenu();

    const loading = useLoadEffect(async () => {
        await dispatch.products.index();
    }, []);

    function handleClick(product: ProductType) {
        if (open === product.id) {
            setOpen(undefined);
        } else {
            setOpen(product.id);
        }
    }

    async function handleDelete() {
        if (!open) return;

        const confirmed = await confirm({
            title: 'Deletar produto?',
            description: 'Deletar permanentemente o produto do sistema',
            action: 'Deletar',
        });

        if (confirmed) {
            dispatch.products.destroy(open);
        }
    }

    function getProducts(): any[] {
        if (loading) {
            return Array.from(Array(4).keys()).map(id => ({id}));
        } else {
            return Object.values(products.products);
        }
    }

    return <>
        {menu}

        <AdminProductIndex
            products={getProducts()}
            expanded={open}
            onClick={handleClick}
            onDelete={handleDelete}
        />
    </>
};
