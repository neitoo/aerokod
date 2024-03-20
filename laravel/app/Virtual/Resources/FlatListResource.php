<?php

namespace App\Virtual\Resources;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     title="FlatListResource",
 *     description="Ресурс списка квартир",
 *     @OA\Xml(
 *         name="FlatListResource"
 *     )
 * )
 */
class FlatListResource
{

    /**
     * @OA\Property(
     *      title="data",
     *      description="data",
     *  )
     * @var FlatItemResource[]
     */
    private array $data;
}
