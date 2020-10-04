import React, {useState} from "react";
import {useDispatch}     from "react-redux";
import {Dispatch}        from "../store";
import {useAuth}         from "../selectors";
import {SpinnerAlt}      from "../css.gg";

export const Login: React.FC<object> = () => {
    const auth = useAuth();
    const dispatch = useDispatch<Dispatch>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    function handleEmailChange(event: React.FormEvent<HTMLInputElement>) {
        setEmail(event.currentTarget.value);
    }

    function handlePasswordChange(event: React.FormEvent<HTMLInputElement>) {
        setPassword(event.currentTarget.value)
    }

    async function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setLoading(true);
        await dispatch.auth.login({email, password});
        setLoading(false);
    }

    const failed = auth?.failed;

    // @ts-ignore
    return <form className="mx-auto container bg-gray-100" onSubmit={handleOnSubmit}>
        <h1 className="text-5xl text-center">DiCasa</h1>

        <div className="w-full px-32">
            <label className={`${failed ? 'text-red-500' : ' text-gray-500'}`} htmlFor="#email">Email</label>
            <input
                className={`transition-colors duration-300 block w-full mb-8 py-3 px-4 text-black bg-transparent border-b border-lg${failed ? ' border-red-500' : ''}`}
                placeholder="Digite seu email..."
                id="email"
                onChange={handleEmailChange}
                name="email"
                type="text"
            />

            <label className={`${failed ? 'text-red-500' : ' text-gray-500'}`} htmlFor="#password">Password</label>
            <input
                className={`transition-colors duration-300 block w-full mb-8 py-3 px-4 text-black bg-transparent border-b border-lg${failed ? ' border-red-500' : ''}`}
                placeholder="Digital sua senha..."
                id="password"
                onChange={handlePasswordChange}
                name="password"
                type="password"
            />

            <div className="flex justify-end mb-16">
                <button className="text-right text-orange-400 font-medium">Esqueceu a sua senha?</button>
            </div>

            {failed && <div className="w-full my-4 text-red-500 text-center text-lg font-medium">
                Email e senha inválidos! Por favor tente novamente.
            </div>}

            <button className="w-full py-4 bg-primary-500 text-center text-xl text-white font-medium rounded-lg">
                {loading ?
                    <SpinnerAlt className="inline-block ggs-2"/> :
                    <span>Entrar</span>
                }
            </button>

            <div className="text-center mt-8">
                <a className="w-full text-gray-500" href="#">
                    Ainda não possui uma conta?
                    <span className="ml-1 text-orange-400">Registre-se aqui</span>
                </a>
            </div>
        </div>
    </form>
};
