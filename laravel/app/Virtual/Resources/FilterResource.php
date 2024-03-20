<?php

namespace App\Virtual\Resources;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     title="FilterResource",
 *     description="Ресурс списка фильров",
 *     @OA\Xml(
 *         name="FilterResource"
 *     )
 * )
 */
class FilterResource
{

    /**
     * @OA\Property(
     *      title="data",
     *      description="data",
     *  )
     * @var FilterDataResource
     */
    private FilterDataResource $data;
}
