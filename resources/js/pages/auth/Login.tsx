import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import {LoginCredentials} from "@type/auth";
import useNavigation from "@hooks/useNavigation";
import {Container} from "@containers/Container";
import {Dispatch} from "~/store";
import {useAuth} from "~/selectors";
import {Button} from "@components/ui/Button";
import {Input} from "@components/form/Input";
import {Error} from "@components/ui/Error";

export const Login: React.FC<object> = () => {
    const auth = useAuth();
    const dispatch = useDispatch<Dispatch>();
    const {go} = useNavigation();
    const [loading, setLoading] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm<LoginCredentials>();

    async function login(credentials: LoginCredentials) {
        setLoading(true);
        try {
            await dispatch.auth.login(credentials);
            go('/home');
        } catch (e) {
            // TODO
        }
        setLoading(false);
    }

    const failed = auth?.failed;

    return <Container>
        <div className="mx-auto container min-h-screen flex justify-center items-center">
            <form className="px-4 w-full" onSubmit={handleSubmit(login)}>
                <h1 className="mb-10 text-center text-5xl text-gray-800 font-bold leading-none tracking-tight">
                    Mercado Escola
                </h1>

                {failed && <Error>
                    Email e senha inválidos! Por favor tente novamente.
                </Error>}

                <div>
                    <div>
                        <Input
                            name="email"
                            label="Email"
                            error={errors.email}
                            inputProps={register('email', {required: 'Digite seu email'})}
                        />
                    </div>

                    <div className="my-8">
                        <Input
                            name="password"
                            label="Senha"
                            error={errors.password}
                            inputProps={{
                                ...register('password', {required: 'Digite a sua senha'}),
                                type: 'password',
                            }}
                        />

                        <div className="flex justify-end mt-4">
                            <Link to="/forgot-password" className="text-right text-secondary-500 font-medium">Esqueceu a
                                sua senha?</Link>
                        </div>
                    </div>

                    <Button className="w-full mt-4" loading={loading}>
                        Entrar
                    </Button>

                    <div className="mt-8 px-4 text-center">
                        <Link to="/register" className="w-full text-gray-500">
                            Ainda não possui uma conta?
                            <span className="ml-1 text-secondary-400">Registre-se aqui</span>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    </Container>
};
