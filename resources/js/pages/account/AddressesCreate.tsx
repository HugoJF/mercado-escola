import React, {useEffect, useState} from "react";
import {useDispatch}                from "react-redux";
import {Dispatch}                                        from "../../store";
import {useHistory, useRouteMatch}                       from "react-router-dom";
import {Title}                                           from "../../components/Title";
import {Box}                                             from "../../components/Box";
import {CheckSquare, ChevronRight, Loader, Plus, Square} from "react-feather";
import {useAddresses}                                    from "../../selectors";
import {Loading}                                         from "../../components/Loading";
import {useForm}                                         from "react-hook-form";
import {LoginCredentials}  from "../../models/auth";
import {AddressProperties} from "../../models/addresses";

export const AddressesCreate: React.FC = ({children}) => {
    const dispatch = useDispatch<Dispatch>();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const {register, handleSubmit, watch, errors} = useForm<AddressProperties>();

    async function storeAddress(data: AddressProperties) {
        setLoading(true);
        await dispatch.addresses.store(data);
        setLoading(false);
        history.goBack();
    }

    return <>
        <Title>Selecione o seu endereço</Title>
        <form className="mt-8 px-4 w-full" onSubmit={handleSubmit(storeAddress)}>
            <label className={`${errors.address ? 'text-red-500' : ' text-gray-500'}`} htmlFor="#address">Endereço</label>
            <input
                className={`transition-colors duration-300 block w-full mb-8 py-3 px-4 text-black bg-transparent border-b border-lg${errors.address ? ' border-red-500' : ''}`}
                placeholder="Digite seu endereço..."
                id="address"
                ref={register({required: true})}
                name="address"
                type="text"
            />

            <label className={`${errors.number ? 'text-red-500' : ' text-gray-500'}`} htmlFor="#number">Número</label>
            <input
                className={`transition-colors duration-300 block w-full mb-8 py-3 px-4 text-black bg-transparent border-b border-lg${errors.number ? ' border-red-500' : ''}`}
                placeholder="Digite o número da residência..."
                id="number"
                ref={register({required: true})}
                name="number"
                type="number"
            />

            <label className={`${errors.complement ? 'text-red-500' : ' text-gray-500'}`} htmlFor="#complement">Complemento</label>
            <input
                className={`transition-colors duration-300 block w-full mb-8 py-3 px-4 text-black bg-transparent border-b border-lg${errors.complement ? ' border-red-500' : ''}`}
                placeholder="Digite o complemento do endereço..."
                id="complement"
                ref={register}
                name="complement"
                type="text"
            />


            <button className="w-full py-4 bg-primary-500 text-center text-xl text-white font-medium rounded-lg">
                {loading ?
                    <Loader size={30} className="animate-spin mx-auto block"/>
                    :
                    <span>Adicionar</span>
                }
            </button>
        </form>
    </>
};
