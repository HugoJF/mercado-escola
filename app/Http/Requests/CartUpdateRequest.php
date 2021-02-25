<?php

namespace App\Http\Requests;

use App\Models\Product;
use Illuminate\Foundation\Http\FormRequest;

class CartUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'address_id' => 'nullable|exists:addresses,id',
        ];
    }

    public function address()
    {
        if ($id = $this->input('address_id')) {
            return Product::query()->find($id);
        } else {
            return null;
        }
    }
}
