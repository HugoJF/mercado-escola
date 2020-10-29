import React, {useEffect, useState}           from "react";
import {Title}                                from "../../components/ui/Title";
import {ArrowRight, Plus, ShoppingBag, Trash} from "react-feather";
import useRelativePath                        from "../../hooks/useRelativePath";
import {useDispatch}                          from "react-redux";
import {Dispatch}                             from "../../store";
import {useProducts}                          from "../../selectors";
import {HeightTransitioner}                   from "../../components/ui/HeightTransitioner";
import {ConfirmActionMenu}                    from "../../action-menu/ConfirmActionMenu";
import {Link, useHistory}                     from "react-router-dom";
import {FlatButton}                           from "../../components/ui/FlatButton";
import {Skeleton}                             from "../../components/ui/Skeleton";
import useAsyncEffect                         from "../../hooks/useAsyncEffect";

export const AdminProductIndex: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const history = useHistory();
    const relative = useRelativePath();
    const products = useProducts();
    const [loading, setLoading] = useState(true);
    const [confirmMenuOpen, setConfirmMenuOpen] = useState(false);
    const [open, setOpen] = useState<number | null>(null);

    useAsyncEffect(async () => {
        setLoading(true);
        await dispatch.products.index();
        setLoading(false);
    }, []);

    function handleClick(id: number) {
        if (open === id) {
            setOpen(null);
        } else {
            setOpen(id);
        }
    }

    function handleConfirmDeletion(confirmed: boolean) {
        if (!open) {
            return;
        }

        if (confirmed) {
            dispatch.products.destroy(open);
        }

        setOpen(null);
    }

    function getProducts() {
        if (loading) {
            return Array(4).fill({});
        } else {
            return Object.values(products.products);
        }
    }

    return <>
        <div className="mx-auto container">
            <Title>Lista de produtos</Title>

            <ConfirmActionMenu
                open={confirmMenuOpen}
                onClose={() => setConfirmMenuOpen(false)}
                title="Deletar produto?"
                action="Deletar"
                description="Deletar permanentemente o produto do sistema"
                onClick={handleConfirmDeletion}
            />

            <div className="mt-8">
                {getProducts().map(product => (
                    <HeightTransitioner>
                        <div
                            key={product.id}
                            onClick={() => handleClick(product.id)}
                            className={`transition-colors duration-150 w-full py-3 flex items-center
                                border-b last:border-b-0 border-gray-200`}
                        >
                            <div className="flex items-center justify-center w-6 mr-4">
                                <ShoppingBag className="text-primary-500"/>
                            </div>

                            <div className="flex-grow">
                                <h3 className="text-lg font-medium">{product.title || <Skeleton className="w-3/4"/> }</h3>
                                <p className="text-gray-500 font-thin">{product.description || <Skeleton className="w-full"/> }</p>
                            </div>

                            {!loading && <ArrowRight className={`transform transition-transform duration-150
                                ml-2 ${open === product.id ? 'rotate-90' : ''} flex-shrink-0 text-gray-500`}
                            />}
                        </div>

                        {/* Reveal menu */}
                        {open === product.id && <div className="py-2 grid grid-cols-3 divide-x divide-gray-200 border-b border-gray-200">
                            {/* View */}
                            <Link
                                to={`/produtos/${product.id}`}
                                className="flex justify-center items-center py-2 px-5 text-gray-700 font-medium rounded-lg"
                            >
                                Ver
                            </Link>

                            {/* Delete */}
                            <div
                                onClick={() => setConfirmMenuOpen(true)}
                                className="flex justify-center items-center py-2 px-4 text-red-600 font-medium rounded-lg"
                            >
                                <Trash size={20} className="mr-1 flex-shrink-0 inline"/>
                                Deletar
                            </div>

                            {/* Edit */}
                            <Link
                                to={relative(`/${product.id}/editar`)}
                                className="flex justify-center items-center py-2 px-5 text-gray-700 font-medium rounded-lg"
                            >
                                Editar
                            </Link>
                        </div>}
                    </HeightTransitioner>
                ))}
            </div>

            <FlatButton
                onClick={() => history.push(relative('/novo'))}
            >
                <span className="mr-4 text-lg">Adicionar produto</span>
                <Plus/>
            </FlatButton>
        </div>
    </>
};
