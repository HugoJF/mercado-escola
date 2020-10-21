<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
        ];
    }

    public function products()
    {
        return $this->input('products');
    }
}
