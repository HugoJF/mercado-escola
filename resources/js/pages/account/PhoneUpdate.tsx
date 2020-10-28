import React, {useState}   from "react";
import {useDispatch}       from "react-redux";
import {Dispatch}          from "../../store";
import {useHistory} from "react-router-dom";
import {Title}      from "../../components/ui/Title";
import {Loader}     from "react-feather";
import {useForm}           from "react-hook-form";
import InputMask           from "react-input-mask";

export const PhoneUpdate: React.FC = ({children}) => {
    const dispatch = useDispatch<Dispatch>();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const {register, handleSubmit, watch, errors} = useForm<{phone: string}>();

    async function updatePhone(data: {phone: string}) {
        setLoading(true);
        console.log(data);
        setLoading(false);
        history.goBack();
    }

    return <>
        <Title>Digite seu telefone</Title>
        <form className="mt-8 px-4 w-full" onSubmit={handleSubmit(updatePhone)}>
            <label className={`${errors.phone ? 'text-red-500' : ' text-gray-500'}`} htmlFor="#phone">Telefone</label>
            <InputMask
                className={`transition-colors duration-300 block w-full mb-8 py-3 px-4 text-black bg-transparent border-b border-lg${errors.phone ? ' border-red-500' : ''}`}
                id="phone"
                inputRef={register({required: true})}
                name="phone"
                type="text"
                mask="(67) 9 9999 9999"
            />

            <button className="w-full py-4 bg-primary-500 text-center text-xl text-white font-medium rounded-lg">
                {loading ?
                    <Loader size={30} className="animate-spin mx-auto block"/>
                    :
                    <span>Atualizar</span>
                }
            </button>
        </form>
    </>
};
