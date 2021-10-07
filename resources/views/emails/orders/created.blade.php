@component('mail::message')
    # Obrigado por seu pedido!

    Seu pedido com identificação `{{ $order->id }}` foi registrado com sucesso!


    @if($order->address)
        Seu pedido será entregue no endereço: **{{ $order->address->address }}**
    @else
        Você receberá uma notificação **quando o pedido estiver pronto para ser retirado**!
    @endif

    <br>

    ## Resumo do seu pedido:

    | Produto       | Quantidade         | Custo  |
    | :------------ | :----------------: | -----: |
    @foreach ($data as $row)
        | {{ $row['name'] }} | {{ $row['quantity'] }} | R$ {{ number_format($row['cost'] / 100, 2) }} |
    @endforeach

    <br>
    <br>

    @if($order->address)
        **Taxa de entrega:** R$ {{ number_format($order->delivery_fee / 100, 2) }}
    @endif

    **Custo total:** R$ {{ number_format($order->total / 100, 2) }}

    @component('mail::button', ['url' => '/pedidos/' . $order->id])
        Detalhes
    @endcomponent

    Obrigado,<br>
    {{ config('app.name') }}
@endcomponent
