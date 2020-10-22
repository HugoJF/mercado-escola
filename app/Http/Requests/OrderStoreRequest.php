<?php

namespace App\Http\Requests;

use App\Models\Order;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class OrderStoreRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'opening_id'            => 'required|exists:openings,id',
            'address_id'            => 'required|exists:addresses,id',
            'products'              => 'required|array',
            'products.*.product_id' => 'exists:products,id',
            'products.*.quantity'   => 'min:0|max:100',
            'state'                 => Rule::in([
                Order::PENDING,
                Order::ACCEPTED,
                Order::READY,
                Order::SHIPPING,
                Order::DELIVERED,
                Order::CANCELLED,
                Order::REJECTED,
            ]),
        ];
    }

    public function products()
    {
        return $this->input('products');
    }
}
