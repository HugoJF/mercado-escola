import React, {useState}                      from "react";
import {Title}                                from "../../components/ui/Title";
import {ArrowRight, Plus, ShoppingBag, Trash} from "react-feather";
import useRelativePath                        from "../../hooks/useRelativePath";
import {useDispatch}                          from "react-redux";
import {Dispatch}                             from "../../store";
import {useProducts}                          from "../../selectors";
import {HeightTransitioner}                   from "../../components/ui/HeightTransitioner";
import {Link, useHistory}                     from "react-router-dom";
import {FlatButton}                           from "../../components/ui/FlatButton";
import {Skeleton}                             from "../../components/ui/Skeleton";
import useAsyncEffect                         from "../../hooks/useAsyncEffect";
import useConfirmMenu                         from "../../hooks/useConfirmMenu";
import classNames                             from "classnames";
import {PriceFormatter}                       from "../../components/ui/PriceFormatter";
import {QuantityTypeText}                     from "../../components/ui/QuantityTypeText";

export const AdminProductIndex: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const history = useHistory();
    const relative = useRelativePath();
    const products = useProducts();
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState<number | null>(null);
    const [menu, confirm] = useConfirmMenu();

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

    async function handleDelete() {
        if (!open) return;

        const result = await confirm({
            title: 'Deletar produto?',
            description: 'Deletar permanentemente o produto do sistema',
            action: 'Deletar',
        });

        if (result) {
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
        <div className="mx-auto container">
            <Title>Lista de produtos</Title>

            {menu}

            <div className="mt-8">
                {getProducts().map(product => (
                    <div
                        key={product.id}
                        className="transition-colors duration-150 w-full py-3
                                border-b last:border-b-0 border-gray-200"
                    >
                        <HeightTransitioner>
                            {/* Product details */}
                            <div
                                onClick={() => handleClick(product.id)}
                                className="flex items-center"
                            >
                                <div className="flex items-center justify-center w-6 mr-4">
                                    <ShoppingBag className="text-primary-500"/>
                                </div>

                                <div className="flex-grow">
                                    <h3 className="text-lg font-medium">{product.name || <Skeleton className="w-3/4"/>}</h3>
                                    <div className="mt-1">
                                        {/* Stats */}
                                        <ul className="flex space-x-2 text-sm text-gray-500 tracking-tight">
                                            {/* Product price */}
                                            <li className="text-center">
                                                {product?.quantity_cost ?
                                                    <>
                                                        <PriceFormatter cents price={product.quantity_cost}/>
                                                        /
                                                        <QuantityTypeText type={product?.quantity_type}/>
                                                    </>
                                                    :
                                                    <Skeleton className="w-20"/>
                                                }
                                            </li>

                                            {/* Separator */}
                                            <span className="font-bold text-gray-300">·</span>

                                            {/* Product quantity */}
                                            <li className="text-center">
                                                {product?.media ? `${Object.values(product.media).length} imagens` : <Skeleton className="w-20"/>}
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {!loading && <ArrowRight className={classNames(
                                    `transform transition-transform duration-150 ml-2 flex-shrink-0`,
                                    {
                                        'rotate-90 text-gray-500': open === product.id,
                                        'text-gray-300': open !== product.id,
                                    },
                                )}
                                />}
                            </div>

                            {/* Reveal menu */}
                            <div className="mt-4">
                                {open === product.id && <div className="grid grid-cols-3 divide-x divide-gray-200">
                                    {/* View */}
                                    <Link
                                        to={`/produtos/${product.id}`}
                                        className="flex justify-center items-center py-2 px-5 text-gray-700 font-medium rounded-lg"
                                    >
                                        Ver
                                    </Link>

                                    {/* Delete */}
                                    <div
                                        onClick={handleDelete}
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
                            </div>
                        </HeightTransitioner>
                    </div>
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
