<?php

namespace App\Mail;

use App\Actions\Cart\CartCost;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OrderCreated extends Mailable
{
    use Queueable, SerializesModels;

    public Order $order;
    protected CartCost $cost;

    /**
     * Create a new message instance.
     *
     * @param Order $order
     */
    public function __construct(Order $order)
    {
        $this->order = $order;
        $this->cost = app(CartCost::class);
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $this->order->loadMissing(['products']);

        $data = $this->order->products->map(fn($product) => array_merge(
            $this->productData($product),
            ['name' => $product->name]
        ));

        return $this->markdown('emails.orders.created', compact('data'));
    }

    protected function productData(Product $product)
    {
        if ($product->type === 'unit') {
            return [
                'quantity' => $product->pivot->quantity,
                'cost'     => $this->cost->costByUnit($product),
            ];
        }

        $weight = $product->pivot->quantity * $product->weight_increment;

        if ($weight < 1000) {
            $weight .= ' gramas';
        } else {
            $weight = round($weight / 1000) . ' kg';
        }

        return [
            'quantity' => $weight,
            'cost'     => $this->cost->costByWeight($product),
        ];
    }

    public function subject($subject)
    {
        return 'Pedido criado com sucesso!';
    }
}
