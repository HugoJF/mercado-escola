<?php

namespace App\Exceptions;

use Symfony\Component\HttpKernel\Exception\HttpException;

class NoActiveOpeningException extends HttpException
{
    public function __construct()
    {
        parent::__construct(412, "There are no active openings right now");
    }
}
