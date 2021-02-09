import React, {useMemo, useState} from "react";
import {useDispatch}              from "react-redux";
import {Dispatch}                 from "../../../store";
import {useProducts}              from "../../../selectors";
import useConfirmMenu             from "../../../hooks/useConfirmMenu";
import useLoadEffect              from "../../../hooks/useLoadEffect";
import {AdminProductIndex}        from "./AdminProductIndex";
import {ProductType}              from "../../../models/products";
import {Empty}                    from "../../../components/ui/Empty";
import {Title}                    from "../../../components/ui/Title";
import {isEmpty, objectRange}     from "../../../helpers/Functions";
import {Loading}                  from "../../../components/ui/Loading";
import {PagePadding}              from "../../../containers/PagePadding";

export const AdminProductIndexContainer: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
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

    const data: any[] = useMemo(() => {
        if (loading) {
            return objectRange(4);
        } else {
            return Object.values(products.products);
        }
    }, [loading, products.products]);

    return loading
        ?
        <Loading/>
        :
        <PagePadding className="space-y-4">
            {menu}

            <Title>Lista de produtos</Title>

            {isEmpty(products.products) && !loading && <div>
                <Empty
                    title="Nenhum produto!"
                    description="Você ainda não registrou um endereço de entrega"
                />
            </div>}

            <AdminProductIndex
                products={data}
                expanded={open}
                onClick={handleClick}
                onDelete={handleDelete}
            />
        </PagePadding>
};
