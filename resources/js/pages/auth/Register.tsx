import React, {useState}     from "react";
import {useDispatch}         from "react-redux";
import {Dispatch}            from "../../store";
import {useForm}             from "react-hook-form";
import {Link}                from "react-router-dom";
import {Input}               from "../../components/form/Input";
import {Button}              from "../../components/ui/Button";
import {Title}               from "../../components/ui/Title";
import {PagePadding}         from "../../containers/PagePadding";
import useNavigation         from "../../hooks/useNavigation";
import {RegisterCredentials} from "../../types/auth";

export const Register: React.FC<object> = () => {
    const dispatch = useDispatch<Dispatch>();
    const {go} = useNavigation();
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
            await dispatch.auth.login({
                email: credentials.email,
                password: credentials.password,
            });
            go('/on-boarding');
        } catch (e) {
            setErrors(e.response.data.errors);
        }
        setLoading(false);
    }

    // @ts-ignore
    return <PagePadding>
        <div className="mx-auto container">
            <form onSubmit={handleSubmit(registerUser)}>
                <Title>Criando uma nova conta</Title>

                <div>
                    {/* Name */}
                    <div className="mt-8">
                        <Input
                            name="name"
                            label="Nome"
                            error={errors.name}
                            inputProps={{
                                ref: register({required: 'Digite o seu nome'}),
                                placeholder: 'Digite o seu nome',
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
                                placeholder: 'Digite um email para registrar',
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
                                placeholder: 'Digite uma senha',
                                type: 'password',
                            }}
                        />
                    </div>

                    {/* Password confirmation */}
                    <div className="mt-8">
                        <Input
                            name="password_confirmation"
                            label="Confirmação da senha"
                            error={errors.password_confirmation}
                            inputProps={{
                                ref: register({
                                    required: true,
                                    validate: p => p === watch('password') || 'As senhas não conferem',
                                }),
                                placeholder: 'Digite a senha novamente',
                                type: 'password',
                            }}
                        />
                    </div>

                    <div className="mt-8">
                        <Button loading={loading}>Registrar</Button>
                    </div>

                    <div className="text-center mt-8">
                        <Link to="/login" className="w-full text-gray-500">
                            Já possui uma conta?
                            <span className="ml-1 text-orange-400">Clique aqui</span>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    </PagePadding>
};
