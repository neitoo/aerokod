<?php

namespace App\Virtual\Resources;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     title="FilterProjectResource",
 *     description="FilterProjectResource",
 *     @OA\Xml(
 *         name="FilterProjectResource"
 *     )
 * )
 */
class FilterProjectResource
{
    /**
     * @OA\Property(
     *     title="id",
     *     description="id проекта"
     * )
     * @var int
     */
    private int $id;

    /**
     * @OA\Property(
     *     title="title",
     *     description="название проекта"
     * )
     * @var string
     */
    private string $title;

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
