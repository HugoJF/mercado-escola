import React, {useMemo, useState} from "react";
import queryString from "query-string";
import {useForm} from "react-hook-form";
import {useParams} from "react-router";
import {useDispatch} from "react-redux";
import {useLocation} from "react-router-dom";
import useNavigation from "../../hooks/useNavigation";
import {PagePadding} from "../../containers/PagePadding";
import {Button} from "../../components/ui/Button";
import {Title} from "../../components/ui/Title";
import {Input} from "../../components/form/Input";
import {Dispatch} from "../../store";
import {Errors} from "../../types";

type Form = {
    email: string;
    password: string;
    password_confirmation: string;
}

type Params = {
    token: string;
}

export const ResetPassword: React.FC<object> = () => {
    const dispatch = useDispatch<Dispatch>();
    const params = useParams<Params>();
    const location = useLocation();
    const {go} = useNavigation();
    const [loading, setLoading] = useState(false);
    const {register, handleSubmit, setError, watch, errors} = useForm<Form>();

    const parsed = useMemo(() => queryString.parse(location.search), [location]);
    const email = parsed.email as string;
    const token = params.token;

    if (!email) {
        dispatch.toasts.add({
            title: 'Senha alterada',
            description: 'Sua senha foi alterada com sucesso!',
        });
        go('/login');
        return <></>;
    }

    function setErrors(errors: Errors<Form>) {
        for (let [key, messages] of Object.entries(errors)) {
            setError(key as keyof Form, {type: 'manual', message: messages[0]});
        }
    }

    async function resetPassword({password, password_confirmation}: Form) {
        setLoading(true);
        try {
            await dispatch.auth.resetPassword({
                email, password, password_confirmation, token,
            });
            go('/login');
        } catch (e) {
            setErrors(e.response.data.errors);
            setLoading(false);
        }
    }

    return <PagePadding>
        <div className="mx-auto container">
            <form onSubmit={handleSubmit(resetPassword)}>
                <Title>Alterando senha</Title>

                <div>
                    {/* Email */}
                    <div className="mt-8">
                        <Input
                            name="email"
                            label="Email"
                            error={errors.email}
                            disabled
                            inputProps={{
                                value: email,
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
                                ref: register({required: 'Digite a sua nova senha'}),
                                placeholder: 'Digite a sua nova senha',
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

                    <Button className="w-full mt-8" loading={loading}>
                        Atualizar senha
                    </Button>
                </div>
            </form>
        </div>
    </PagePadding>
};
