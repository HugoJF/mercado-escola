import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {Dispatch} from "~/store";
import {Link} from "react-router-dom";
import {Input} from "@components/form/Input";
import {Button} from "@components/ui/Button";
import {Title} from "@components/ui/Title";
import {PagePadding} from "@containers/PagePadding";
import useNavigation from "@hooks/useNavigation";
import {RegisterCredentials} from "@type/auth";
import useFormy from "@hooks/useMyFormy";

export const Register: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const {go} = useNavigation();
    const [loading, setLoading] = useState(false);
    const {setErrors, form: {register, handleSubmit, watch, formState: {errors}}} = useFormy<RegisterCredentials>();

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
                                ...register('name', {required: 'Digite o seu nome'}),
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
                                ...register('email', {required: 'Digite um email para registrar'}),
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
                                ...register('password', {required: 'Digite uma senha'}),
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
                                ...register('password_confirmation', {
                                    required: true,
                                    validate: p => p === watch('password') || 'As senhas não conferem',
                                }),
                                placeholder: 'Digite a senha novamente',
                                type: 'password',
                            }}
                        />
                    </div>

                    <Button className="w-full mt-8" loading={loading}>Registrar</Button>

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
