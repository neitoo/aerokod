<?php

namespace App\Virtual\Resources;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     title="FilterRoomResource",
 *     description="FilterRoomResource",
 *     @OA\Xml(
 *         name="FilterRoomResource"
 *     )
 * )
 */
class FilterRoomResource
{
    /**
     * @OA\Property(
     *     title="number",
     *     description="количество комнат"
     * )
     * @var int
     */
    private int $number;

    /**
     * @OA\Property(
     *     title="is_active",
     *     description="активный(в query параметре)"
     * )
     * @var bool
     */
    private bool $is_active;

    /**
     * @OA\Property(
     *     title="disabled",
     *     description="отключен(нельзя выбрать)"
     * )
     * @var bool
     */
    private bool $disabled;
}
