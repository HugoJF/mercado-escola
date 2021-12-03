<?php

namespace App\Actions\Cart;

use App\Models\Address;
use App\Models\User;
use Illuminate\Contracts\Auth\Access\Gate;

class UpdateCartAddress
{
    /**
     * @param User $user
     * @param Address|null $address
     */
    public function handle(User $user, ?Address $address)
    {
        if ($address) {
            app(Gate::class)->authorize('view', $address);

            $user->cartAddress()->associate($address);
        } else {
            $user->cartAddress()->dissociate();
        }
        $user->save();
    }
}
