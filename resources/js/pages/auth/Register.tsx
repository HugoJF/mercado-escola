import React, {useState}     from "react";
import {useDispatch}         from "react-redux";
import {Dispatch}            from "../../store";
import {useHistory}          from "react-router";
import {useForm}             from "react-hook-form";
import {RegisterCredentials} from "../../models/auth";
import {Link}                from "react-router-dom";
import {Input}               from "../../components/form/Input";
import {Button}              from "../../components/ui/Button";

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
            history.push('/home');
        } catch (e) {
            setErrors(e.response.data.errors);
        }
        setLoading(false);
    }

    // @ts-ignore
    return <div className="mx-auto container">
        <form onSubmit={handleSubmit(registerUser)}>
            <h1 className="text-5xl text-center">DiCasa</h1>

            <div>
                {/* Name */}
                <div className="mt-8">
                    <Input
                        name="name"
                        label="Nome"
                        error={errors.name}
                        inputProps={{
                            ref: register({required: 'Digite o seu nome'}),
                            type: 'text',
                        }}
                    />
                </div>

                {/* Email */}
                <div className="mt-8">
                    <Input
                        name="email"
                        label="Email"
                        error={errors.email}
                        inputProps={{
                            ref: register({required: 'Digite um email para registrar'}),
                            type: 'email',
                        }}
                    />
                </div>

                {/* Password */}
                <div className="mt-8">
                    <Input
                        name="password"
                        label="Senha"
                        error={errors.password}
                        inputProps={{
                            ref: register({required: 'Digite uma senha'}),
                            type: 'password',
                        }}
                    />
                </div>

                {/* Password confirmation */}
                <div className="mt-8">
                    <Input
                        name="password_confirmation"
                        label="Confirmação da senha"
                        error={errors.password}
                        inputProps={{
                            ref: register({
                                required: true,
                                validate: p => p === watch('password') || 'Verifique a confirmação da senha'
                            }),
                            type: 'password',
                        }}
                    />
                </div>

                <Button loading={loading}>Registrar</Button>

                <div className="text-center mt-8">
                    <Link to="/login" className="w-full text-gray-500">
                        Já possui uma conta?
                        <span className="ml-1 text-orange-400">Clique aqui</span>
                    </Link>
                </div>
            </div>
        </form>
    </
        div>
};
