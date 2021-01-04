<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class OpeningStoreRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'opens_at'            => 'required|date',
            'closes_at'           => 'required|date',
            'delivers_at'         => 'required|date',
            'enabled_at'          => 'nullable|date',
            'max_delivery_orders' => 'required|numeric|min:1',
            'max_pickup_orders'   => 'required|numeric|min:1',
        ];
    }

    public function opensAt()
    {
        return Carbon::parse($this->input('opens_at'));
    }

    public function closesAt()
    {
        return Carbon::parse($this->input('closes_at'));
    }
}
