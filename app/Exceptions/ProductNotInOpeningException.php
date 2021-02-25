<?php

namespace App\Exceptions;

use App\Models\Product;
use Symfony\Component\HttpKernel\Exception\HttpException;

class ProductNotInOpeningException extends HttpException
{
    public function __construct(Product $product)
    {
        parent::__construct(412, "Product $product->name is not available in the current opening.");
    }
}
