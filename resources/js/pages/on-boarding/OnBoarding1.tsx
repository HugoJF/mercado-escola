import React, {useState} from 'react';
import classNames        from "classnames";
import InputMask         from "react-input-mask";
import {Loader}          from "react-feather";
import {useForm}         from "react-hook-form";
import {useHistory}      from "react-router-dom";

export const OnBoarding1: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const {register, handleSubmit, errors} = useForm<{ phone: string }>();

    async function updatePhone(data: { phone: string }) {
        setLoading(true);
        console.log(data);
        setLoading(false);
        history.push('/on-boarding/2');
    }

    return <div className="px-4 bg-gradient-to-br from-primary-400 to-primary-700 min-h-screen flex flex-col justify-center bg-blue-500">
        <h1 className="text-5xl text-white text-center font-bold">Quase lá</h1>
        <h3 className="px-10 text-primary-100 text-center tracking-tight">Precisamos de um meio de entrar em contato quando necessário!</h3>

        <form className="mt-8 w-full" onSubmit={handleSubmit(updatePhone)}>
            <label className={classNames(
                {
                    'text-red-500': errors.phone,
                    'text-primary-100': !errors.phone,
                }
            )} htmlFor="#phone">Telefone</label>
            <InputMask
                className={`transition-colors duration-300 block w-full mb-8 py-3 px-4 text-white bg-transparent border-b border-lg${errors.phone ? ' border-red-500' : ''}`}
                id="phone"
                inputRef={register({required: true})}
                name="phone"
                type="text"
                mask="(67) 9 9999 9999"
            />

            <button className="w-full py-4 text-center text-xl text-white font-medium border-2 border-white rounded-lg">
                {loading ?
                    <Loader size={30} className="animate-spin mx-auto block"/>
                    :
                    <span>Atualizar</span>
                }
            </button>
        </form>
    </div>
};
