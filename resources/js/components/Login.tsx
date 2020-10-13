import React, {useEffect, useState} from "react";
import {useDispatch}                from "react-redux";
import {Dispatch}                   from "../store";
import {useAuth}                    from "../selectors";
import {SpinnerAlt}                 from "../css.gg";
import {useHistory}                 from "react-router";
import useIsAuthed                  from "../hooks/useIsAuthed";
import {useForm}                    from "react-hook-form";
import {LoginCredentials}           from "../models/auth";

export const Login: React.FC<object> = () => {
    const auth = useAuth();
    const logged = useIsAuthed();
    const dispatch = useDispatch<Dispatch>();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const {register, handleSubmit, watch, errors} = useForm<LoginCredentials>();


    useEffect(() => {
        if (logged) {
            history.push('/');
        }
    }, [logged]);

    async function login(credentials: LoginCredentials) {
        setLoading(true);
        await dispatch.auth.login(credentials);
        setLoading(false);
        history.push('/');
    }

    const failed = auth?.failed;

    // @ts-ignore
    return <div className="mx-auto container min-h-screen flex justify-center items-center">
        <form className="px-4 w-full" onSubmit={handleSubmit(login)}>
            <h1 className="text-5xl text-center">DiCasa</h1>

            <div>
                <label className={`${failed ? 'text-red-500' : ' text-gray-500'}`} htmlFor="#email">Email</label>
                <input
                    className={`transition-colors duration-300 block w-full mb-8 py-3 px-4 text-black bg-transparent border-b border-lg${errors.email ? ' border-red-500' : ''}`}
                    placeholder="Digite seu email..."
                    id="email"
                    ref={register({required: true})}
                    name="email"
                    type="text"
                />

                <label className={`${failed ? 'text-red-500' : ' text-gray-500'}`} htmlFor="#password">Password</label>
                <input
                    className={`transition-colors duration-300 block w-full mb-8 py-3 px-4 text-black bg-transparent border-b border-lg${errors.password ? ' border-red-500' : ''}`}
                    placeholder="Digital sua senha..."
                    id="password"
                    ref={register({required: true})}
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
                        <SpinnerAlt className="mx-auto block ggs-2"/>
                        :
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
    </div>
};
