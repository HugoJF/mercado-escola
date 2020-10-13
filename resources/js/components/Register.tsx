import React, {useState}     from "react";
import {useDispatch}         from "react-redux";
import {Dispatch}            from "../store";
import {SpinnerAlt}          from "../css.gg";
import {useHistory}          from "react-router";
import {useForm}             from "react-hook-form";
import {RegisterCredentials} from "../models/auth";
import {Link}                from "react-router-dom";

export const Register: React.FC<object> = () => {
    const dispatch = useDispatch<Dispatch>();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const {register, handleSubmit, watch, errors, setError} = useForm<RegisterCredentials>();

    function setErrors(errors: object) {
        for (let [key, messages] of Object.entries(errors)) {
            // @ts-ignore
            setError(key, {type: 'manual', message: messages[0]});
        }
    }

    async function registerUser(credentials: RegisterCredentials) {
        setLoading(true);
        try {
            await dispatch.auth.registration(credentials);
            history.push('/');
        } catch (e) {
            setErrors(e.response.data.errors);
        }
        setLoading(false);
    }

    // @ts-ignore
    return <div className="mx-auto container min-h-screen flex justify-center items-center">
        <form className="px-4 w-full" onSubmit={handleSubmit(registerUser)}>
            <h1 className="text-5xl text-center">DiCasa</h1>

            <div>
                {/* Name */}
                <div className="mt-8">
                    <label className={`${errors.name ? 'text-red-500' : ' text-gray-500'}`} htmlFor="#email">Nome</label>
                    <input
                        className={`transition-colors duration-300
                        block w-full py-3 px-4 text-black
                        bg-transparent border-b border-lg${errors.name ? ' border-red-500' : ''}`}
                        placeholder="Digite seu nome completo..."
                        id="name"
                        ref={register({required: 'Digite o seu nome'})}
                        name="name"
                        type="text"
                    />

                    {
                        errors.name &&
                        <p className="text-sm text-red-500 font-medium">{errors.name.message}</p>
                    }
                </div>

                {/* Email */}
                <div className="mt-8">
                    <label className={`${errors.email ? 'text-red-500' : ' text-gray-500'}`} htmlFor="#email">Email</label>
                    <input
                        className={`transition-colors duration-300
                        block w-full py-3 px-4 text-black bg-transparent
                        border-b border-lg${errors.email ? ' border-red-500' : ''}`}
                        placeholder="Digite seu email..."
                        id="email"
                        ref={register({required: 'Digite um email para registrar'})}
                        name="email"
                        type="email"
                    />

                    {
                        errors.email &&
                        <p className="text-sm text-red-500 font-medium">{errors.email.message}</p>
                    }
                </div>

                {/* Password */}
                <div className="mt-8">
                    <label className={`${errors.password ? 'text-red-500' : ' text-gray-500'}`} htmlFor="#password">Senha</label>
                    <input
                        className={`transition-colors duration-300
                        block w-full py-3 px-4 text-black bg-transparent
                        border-b border-lg${errors.password ? ' border-red-500' : ''}`}
                        placeholder="Digite sua senha..."
                        id="password"
                        ref={register({required: 'Digite uma senha'})}
                        name="password"
                        type="password"
                    />

                    {
                        errors.password &&
                        <p className="text-sm text-red-500 font-medium">{errors.password.message}</p>
                    }
                </div>

                {/* Password confirmation */}
                <div className="mt-8">
                    <label className={`${errors.password_confirmation ? 'text-red-500' : ' text-gray-500'}`} htmlFor="#password_confirmation">Confirmação da senha</label>
                    <input
                        className={`transition-colors duration-300
                        block w-full py-3 px-4 text-black bg-transparent
                        border-b border-lg${errors.password_confirmation ? ' border-red-500' : ''}`}
                        placeholder="Digite sua senha novamente..."
                        id="password_confirmation"
                        ref={register({
                            required: true,
                            validate: pw => pw === watch('password') || 'Verifique a confirmação da senha'
                        })}
                        name="password_confirmation"
                        type="password"
                    />

                    {
                        errors.password_confirmation &&
                        <p className="text-sm text-red-500 font-medium">{errors.password_confirmation.message}</p>
                    }
                </div>
                <button className="w-full mt-8 py-4 bg-primary-500 text-center text-xl text-white font-medium rounded-lg">
                    {loading ?
                        <SpinnerAlt className="mx-auto block ggs-2"/>
                        :
                        <span>Registrar</span>
                    }
                </button>

                <div className="text-center mt-8">
                    <Link to="/login" className="w-full text-gray-500">
                        Já possui uma conta?
                        <span className="ml-1 text-orange-400">Clique aqui</span>
                    </Link>
                </div>
            </div>
        </form>
    </div>
};
