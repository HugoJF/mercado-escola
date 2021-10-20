<?php

namespace App\Actions\Address;

use App\Models\Address;
use App\Models\User;

class CreateAddress
{
    public function handle(User $user, array $data)
    {
        $address = new Address($data);

        $address->user()->associate($user);

        $address->save();

        return $address;
    }
}
