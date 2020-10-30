import React                                       from "react";
import {Title}                                     from "../../components/ui/Title";
import {Calendar, Icon, ShoppingBag, Truck, Users} from "react-feather";
import {Link}                                      from "react-router-dom";
import useRelativePath                             from "../../hooks/useRelativePath";

type ButtonType = { title: string, icon: Icon, to: string }

const buttons: ButtonType[] = [{
    title: 'Produtos',
    icon: ShoppingBag,
    to: '/produtos',
}, {
    title: 'Pedidos',
    icon: Truck,
    to: '/produtos',
}, {
    title: 'Produtores',
    icon: Users,
    to: '/produtos',
}, {
    title: 'Aberturas',
    icon: Calendar,
    to: '/produtos',
}];

export const AdminIndex: React.FC = () => {
    const relative = useRelativePath();

    return <>
        <div className="mx-auto container">
            <Title>Administrativo</Title>

            <div className="grid grid-cols-2 gap-8 mt-8">
                {buttons.map(button => (
                    <Link
                        to={relative(button.to)}
                        className="flex flex-col items-center px-4 py-6 bg-gray-200 border rounded-lg shadow-sm"
                    >
                        <button.icon size={40} className="mb-3 text-gray-400"/>
                        <h2 className="text-gray-700 font-medium">{button.title}</h2>
                    </Link>
                ))}
            </div>
        </div>
    </>
};
