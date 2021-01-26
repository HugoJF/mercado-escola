import React, {useState} from "react";
import {DateTimePicker} from "@material-ui/pickers";
import {Input}          from "../../../components/form/Input";
import {Button}         from "../../../components/ui/Button";

export const AdminOrderIndex: React.FC = () => {
    const [opensAt, setOpensAt] = useState(new Date);
    const [closesAt, setClosesAt] = useState(new Date);
    const [deliversAt, setDeliversAt] = useState(new Date);

    return <div className="flex flex-col space-y-4 items-stretch">
        <Input name="max_delivery_orders" label="Quantidade máxima de pedidos delivery"/>

        <Input name="max_pickup_orders" label="Quantidade máxima de pedidos retirada"/>

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

        <Button>Criar</Button>
    </div>
};
