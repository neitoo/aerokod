<?php

namespace App\Virtual\Resources;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     title="FilterDataResource",
 *     description="FilterDataResource",
 *     @OA\Xml(
 *         name="FilterDataResource"
 *     )
 * )
 */
class FilterDataResource
{
    /**
     * @OA\Property(
     *     title="projects",
     *     description="проекти"
     * )
     * @var FilterProjectResource[]
     */
    private array $projects;

    /**
     * @OA\Property(
     *     title="rooms",
     *     description="комнаты"
     * )
     * @var FilterRoomResource[]
     */
    private array $rooms;

    /**
     * @OA\Property(
     *     title="square",
     *     description="площадь"
     * )
     * @var FiltersSquareRequest
     */
    private FiltersSquareRequest $square;

    /**
     * @OA\Property(
     *     title="price",
     *     description="цена"
     * )
     * @var FiltersSquareRequest
     */
    private FiltersSquareRequest $price;
}
