import React, {useEffect, useState}     from "react";
import {Title}                          from "../../components/Title";
import {ArrowRight, ShoppingBag, Trash} from "react-feather";
import useRelativePath                  from "../../hooks/useRelativePath";
import {useDispatch}                    from "react-redux";
import {Dispatch}                       from "../../store";
import {useProducts}                    from "../../selectors";
import {HeightTransitioner}             from "../../components/HeightTransitioner";
import {ConfirmActionMenu}              from "../../action-menu/ConfirmActionMenu";
import {Link}                           from "react-router-dom";

export const AdminProductIndex: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const relative = useRelativePath();
    const products = useProducts();
    const [confirmMenuOpen, setConfirmMenuOpen] = useState(false);
    const [open, setOpen] = useState<number | null>(null);

    useEffect(() => {
        dispatch.products.index();
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

        dispatch.products.destroy(open);
        setOpen(null);
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
                {Object.values(products.products).map(product => (
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
                                <h3 className="text-lg font-medium">{product.title}</h3>
                                <p className="text-gray-500 font-thin">{product.description}</p>
                            </div>

                            <ArrowRight className={`transform transition-transform duration-150
                                ${open === product.id ? 'rotate-90' : ''} flex-shrink-0 text-gray-500`}
                            />
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
        </div>
    </>
};
