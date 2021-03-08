<?php

namespace App\Http\Requests;

use App\Models\Order;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class OrderUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'state' => ['required', Rule::in([
                Order::PENDING,
                Order::ACCEPTED,
                Order::READY,
                Order::SHIPPING,
                Order::DELIVERED,
                Order::CANCELLED,
                Order::REJECTED,
            ])],
        ];
    }
}
