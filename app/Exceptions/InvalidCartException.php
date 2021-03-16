<?php

namespace App\Exceptions;

use Symfony\Component\HttpKernel\Exception\HttpException;

class InvalidCartException extends HttpException
{
    public function __construct(array $invalidProducts)
    {
        parent::__construct(412, 'Cart contains products that are not available in this opening: ' . implode(',', $invalidProducts));
    }
}
