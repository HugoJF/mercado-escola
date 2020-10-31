<?php

namespace App\Exceptions;

use Symfony\Component\HttpKernel\Exception\HttpException;

class TooManyOpeningsException extends HttpException
{
    public function __construct()
    {
        parent::__construct(412, 'Too many active openings!');
    }
}
