import React                                              from "react";
import {Title}                                            from "../../components/ui/Title";
import {Calendar, ChevronRight, Icon, ShoppingBag, Users} from "react-feather";
import useRelativePath                                    from "../../hooks/useRelativePath";
import {DivOrLink}                                        from "../../components/ui/DivOrLink";
import classNames                                         from "classnames";
import {PagePadding}                                      from "../../containers/PagePadding";

type ButtonType = { title: string, icon: Icon, to: string }

const buttons: ButtonType[] = [{
    title: 'Produtos',
    icon: ShoppingBag,
    to: '/produtos',
}, {
    title: 'Produtores',
    icon: Users,
    to: '/produtores',
}, {
    title: 'Aberturas',
    icon: Calendar,
    to: '/aberturas',
}];

export const AdminIndex: React.FC = () => {
    const relative = useRelativePath();

    return <PagePadding>
        <div className="mx-auto container">
            <Title>Administrativo</Title>

            <div className="mt-4">
                {buttons.map(({icon: Icon, title, to}) => (
                    <DivOrLink
                        key={to}
                        isLink={true}
                        to={relative(to)}
                        className={classNames(
                            `transition-colors duration-150 w-full px-4 py-4 flex items-center
                            border-b last:border-b-0 border-gray-200 hover:bg-gray-200 cursor-pointer`
                        )}
                    >
                        <div className="flex items-center justify-center w-6 mr-4">
                            <Icon className="text-primary-500"/>
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-lg font-medium">{title}</h3>
                        </div>
                        <ChevronRight className="flex-shrink-0 text-gray-500"/>
                    </DivOrLink>
                ))}
            </div>
        </div>
    </PagePadding>
};
