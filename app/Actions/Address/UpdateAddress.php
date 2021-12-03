<?php

namespace App\Actions\Address;

use App\Models\Address;
use App\Models\User;

class UpdateAddress
{
    public function handle(Address $address, array $data)
    {
        $address->fill($data);

        $address->save();

        return $address;
    }
}
