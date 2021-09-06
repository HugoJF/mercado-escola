<?php

namespace App\Mail;

use App\Actions\Cart\ProductCost;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OrderCreated extends Mailable
{
    use Queueable, SerializesModels;

    public Order $order;

    /**
     * Create a new message instance.
     *
     * @param Order $order
     */
    public function __construct(Order $order)
    {
        $this->order = $order;
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
                'cost' => $product->pivot->quantity * $product->pivot->quantity_cost,
            ];
        }

        $weight = $product->pivot->quantity;

        if ($weight < 1) {
            $weight = round($weight * 1000, 3) . ' gramas';
        } else {
            $weight = round($weight, 3) . ' kg';
        }

        return [
            'quantity' => $weight,
            'cost' => $product->quantity * $product->quantity_cost,
        ];
    }

    public function subject($subject)
    {
        return 'Pedido criado com sucesso!';
    }
}
