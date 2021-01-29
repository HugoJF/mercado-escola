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
@foreach ($order->products as $product)
| {{ $product->name }} | {{ $product->pivot->quantity }} | R$ {{ number_format($product->quantity_cost * $product->pivot->quantity / 100, 2) }} |
@endforeach

<br>
<br>

**Custo total:** R$ {{ number_format($order->total / 100, 2) }}

@component('mail::button', ['url' => '/pedidos/' . $order->id])
    Detalhes
@endcomponent

Obrigado,<br>
{{ config('app.name') }}
@endcomponent
