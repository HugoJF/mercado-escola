import React, {useState}   from "react";
import {Input}             from "../../components/form/Input";
import {DateTimePicker}    from "@material-ui/pickers";
import {Button}            from "../../components/ui/Button";
import {useForm}           from "react-hook-form";
import {OpeningProperties} from "../../models/openings";
import {useDispatch}       from "react-redux";
import {Dispatch}          from "../../store";
import {formatISO}         from "date-fns";

export const AdminOpeningCreate: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const [loading, setLoading] = useState(false);
    const [opensAt, setOpensAt] = useState(new Date);
    const [closesAt, setClosesAt] = useState(new Date);
    const [deliversAt, setDeliversAt] = useState(new Date);
    const {register, handleSubmit, errors, setError, setValue} = useForm<OpeningProperties>();

    async function submit(data: OpeningProperties) {
        setLoading(true);
        try {
            await dispatch.openings.store({
                ...data,
                opens_at: formatISO(opensAt),
                closes_at: formatISO(closesAt),
                delivers_at: formatISO(deliversAt),
            });
        } catch (e) {
            setErrors(e.errors);
        }
        setLoading(false);
    }

    function setErrors(errors: object) {
        for (let [key, messages] of Object.entries(errors)) {
            // @ts-ignore
            setError(key, {type: 'manual', message: messages[0]});
        }
    }

    return <form className="flex flex-col space-y-4 items-stretch" onSubmit={handleSubmit(submit)}>
        <Input
            name="max_delivery_orders"
            label="Quantidade máxima de pedidos delivery"
            error={errors.max_delivery_orders}
            inputProps={{
                ref: register({required: 'Digite quantidade máxima de pedidos delivery'}),
                min: 0,
                type: 'number',
            }}
        />

        <Input
            name="max_pickup_orders"
            label="Quantidade máxima de pedidos retirada"
            error={errors.max_pickup_orders}
            inputProps={{
                ref: register({required: 'Digite quantidade máxima de pedidos retirada'}),
                min: 0,
                type: 'number',
            }}
        />

        <DateTimePicker
            ampm={true}
            format="d 'de' MMMM 'às' HH:mm:ss"
            disablePast
            value={opensAt}
            onChange={(date) => setOpensAt(date as Date)}
            label="Data de abertura"
        />

        <DateTimePicker
            ampm={true}
            format="d 'de' MMMM 'às' HH:mm:ss"
            disablePast
            value={closesAt}
            onChange={(date) => setClosesAt(date as Date)}
            label="Data de fechamento"
        />

        <DateTimePicker
            ampm={true}
            format="d 'de' MMMM 'às' HH:mm:ss"
            disablePast
            value={deliversAt}
            onChange={(date) => setDeliversAt(date as Date)}
            label="Data da entrega"
        />

        <Button loading={loading}>
            Criar
        </Button>
    </form>
};
