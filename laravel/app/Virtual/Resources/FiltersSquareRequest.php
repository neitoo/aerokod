<?php

namespace App\Virtual\Resources;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     title="FiltersSquareRequest",
 *     description="FiltersSquareRequest",
 *     @OA\Xml(
 *         name="FiltersSquareRequest"
 *     )
 * )
 */
class FiltersSquareRequest
{
    /**
     * @OA\Property(
     *     title="min",
     *     description="min"
     * )
     * @var int
     */
    private $min;

    /**
     * @OA\Property(
     *     title="max",
     *     description="max"
     * )
     * @var int
     */
    private $max;
}
