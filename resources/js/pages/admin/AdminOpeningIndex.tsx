import React, {useEffect, useState}           from "react";
import {FlatButton}                                     from "../../components/ui/FlatButton";
import {ArrowRight, Calendar, Plus, ShoppingBag, Trash} from "react-feather";
import {useHistory}                                     from "react-router";
import useRelativePath                        from "../../hooks/useRelativePath";
import {HeightTransitioner}                   from "../../components/ui/HeightTransitioner";
import {Skeleton}                             from "../../components/ui/Skeleton";
import classNames                             from "classnames";
import {Link}                                 from "react-router-dom";
import useLoading                             from "../../hooks/useLoading";
import {Dispatch}                             from "../../store";
import {useDispatch}                          from "react-redux";
import {useOpenings}                          from "../../selectors";
import useConfirmMenu                         from "../../hooks/useConfirmMenu";

export const AdminOpeningIndex: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const history = useHistory();
    const relative = useRelativePath();
    const openings = useOpenings();
    const [open, setOpen] = useState<number | null>(null);
    const {loading, load} = useLoading();
    const [menu, confirm] = useConfirmMenu();

    useEffect(() => {
        load(async () => {
            await dispatch.openings.index();
        })
    }, []);

    function getOpenings() {
        if (loading) {
            return Array(4).fill({});
        } else {
            return Object.values(openings.openings);
        }
    }

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
            title: 'Deletar abertura?',
            description: 'Deletar permanentemente o abertura do sistema',
            action: 'Deletar',
        });

        if (result) {
            dispatch.openings.destroy(open);
        }
    }

    return <div className="flex flex-col space-y-4 items-stretch">

        {menu}

        <div className="mt-8">
            {getOpenings().map(opening => (
                <div
                    key={opening.id}
                    className="transition-colors duration-150 w-full py-3
                                border-b last:border-b-0 border-gray-200"
                >
                    <HeightTransitioner>
                        {/* Product details */}
                        <div
                            onClick={() => handleClick(opening.id)}
                            className="flex items-center"
                        >
                            <div className="flex items-center justify-center w-6 mr-4">
                                <Calendar className="text-primary-500"/>
                            </div>

                            <div className="flex-grow">
                                <h3 className="text-lg font-medium">Abertura {opening.id || <Skeleton className="w-1/4"/>}</h3>

                                {opening.max_delivery_orders ?
                                    <p className="text-gray-500 font-thin">
                                        <span className="mr-1 inline-block text-secondary-600 font-medium">
                                            Máximo de pedidos delivery:
                                        </span>
                                        {opening.max_delivery_orders}
                                    </p>
                                    :
                                    <Skeleton className="w-full"/>
                                }
                                {opening.max_pickup_orders ?
                                    <p className="text-gray-500 font-thin">
                                        <span className="mr-1 inline-block text-secondary-600 font-medium">
                                            Máximo de pedidos retirada:
                                        </span>
                                        {opening.max_pickup_orders}
                                    </p>
                                    :
                                    <Skeleton className="w-full"/>
                                }
                                {opening.opens_at ?
                                    <p className="text-gray-500 font-thin">
                                        <span className="mr-1 inline-block text-secondary-600 font-medium">
                                            Abre em:
                                        </span>
                                        {opening.opens_at}
                                    </p>
                                    :
                                    <Skeleton className="w-full"/>
                                }

                                {opening.closes_at ?
                                    <p className="text-gray-500 font-thin">
                                        <span className="mr-1 inline-block text-secondary-600 font-medium">
                                            Fecha em:
                                        </span>
                                        {opening.closes_at}
                                    </p>
                                    :
                                    <Skeleton className="w-full"/>
                                }

                                {opening.delivers_at ?
                                    <p className="text-gray-500 font-thin">
                                        <span className="mr-1 inline-block text-secondary-600 font-medium">
                                            Entrega em:
                                        </span>
                                        {opening.delivers_at}
                                    </p>
                                    :
                                    <Skeleton className="w-full"/>
                                }
                            </div>

                            {!loading && <ArrowRight className={classNames(
                                `transform transition-transform duration-150 ml-2 flex-shrink-0`,
                                {
                                    'rotate-90 text-gray-500': open === opening.id,
                                    'text-gray-300': open !== opening.id,
                                },
                            )}
                            />}
                        </div>

                        {/* Reveal menu */}
                        <div className="mt-4">
                            {open === opening.id && <div className="grid grid-cols-3 divide-x divide-gray-200">
                                {/* View */}
                                <Link
                                    to={`/aberturas/${opening.id}`}
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
                                    to={relative(`/${opening.id}/editar`)}
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
            <span className="mr-4 text-lg">Adicionar abertura</span>
            <Plus/>
        </FlatButton>
    </div>
};
