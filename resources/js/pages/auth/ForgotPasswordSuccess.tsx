import React from "react";
import useNavigation from "@hooks/useNavigation";
import {Button} from "@components/ui/Button";
import {PagePadding} from "@containers/PagePadding";
import {Mail} from "@svg/mail";

export const ForgotPasswordSuccess: React.FC<object> = () => {
    const {bindGo} = useNavigation();

    return <PagePadding>
        <div className="mx-auto container">
            <div className="mx-auto flex flex-shrink-0 items-center justify-center h-64 w-64">
                <Mail/>
            </div>

            <h1 className="mt-4 text-center text-xl">
                Email enviado!
            </h1>

            <p className="mt-2 text-center text-base text-gray-400 tracking-tight">
                Enviamos um email contendo instruções para redefinir a senha da sua conta.
            </p>

            <Button
                onClick={bindGo('/login')}
                className="w-full mt-8"
            >
                Continuar
            </Button>
        </div>
    </PagePadding>
};
