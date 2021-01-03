import React, {useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import {useAddresses}     from "../../selectors";

export const OnBoarding2: React.FC = () => {
    const addresses = useAddresses();
    const history = useHistory();

    useEffect(() => {
        if (Object.values(addresses.addresses).length > 0) {
            history.push('/home');
        }
    }, [addresses.addresses]);

    async function addAddress() {
        history.push('/conta/endereco/novo');
    }

    return <div className="px-4 bg-gradient-to-br from-primary-500 to-primary-700 min-h-screen flex flex-col justify-center bg-blue-500">
        <h1 className="text-5xl text-white text-center font-bold">Último passo</h1>
        <h3 className="mb-8 px-10 text-primary-100 text-center tracking-tight">Para entrega de pedidos, precisamos de um endereço para as entregas</h3>

        <button onClick={addAddress} className="block w-full my-4 py-4 text-center text-xl text-white font-medium border-2 border-white rounded-lg">
            <span>Adicionar</span>
        </button>

        <Link to="/home" className="block w-full my-4 text-primary-100 text-center text-xl text-white rounded-lg">
            Adicionar endereço depois
        </Link>
    </div>
};
