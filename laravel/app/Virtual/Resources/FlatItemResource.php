<?php

namespace App\Virtual\Resources;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     title="FlatItemResource",
 *     description="Ресурс квартиры",
 *     @OA\Xml(
 *         name="FlatItemResource"
 *     )
 * )
 */
class FlatItemResource
{
    /**
     * @OA\Property(
     *     title="id",
     *     description="id",
     *     format="int64",
     *     example=1
     * )
     *
     * @var int
     */
    private int $id;

    /**
     * @OA\Property(
     *     title="project_title",
     *     description="название проекта",
     *     format="int64",
     *     example=1
     * )
     *
     * @var int
     */
    private int $project_title;

    /**
     * @OA\Property(
     *      title="rooms",
     *      description="Количество комнат",
     *      example="string"
     * )
     *
     * @var string
     */
    private string $rooms;

    /**
     * @OA\Property(
     *      title="studio",
     *      description="студия",
     *      example=true
     * )
     *
     * @var boolean
     */
    private bool $studio;

    /**
     * @OA\Property(
     *     title="price",
     *     description="цена",
     * )
     * @var float
     */
    private float $price;

    /**
     * @OA\Property(
     *     title="old_price",
     *     description="старая цена",
     * )
     * @var float
     */
    private float $old_price;

    /**
     * @OA\Property(
     *     title="square",
     *     description="площадь",
     * )
     * @var float
     */
    private float $square;

    /**
     * @OA\Property(
     *     title="release_dates",
     *     description="Срок сдачи",
     * )
     * @var string
     */
    private string $release_dates;

    /**
     * @OA\Property(
     *     title="floor",
     *     description="этаж",
     * )
     * @var string
     */
    private string $floor;

    /**
     * @OA\Property(
     *     title="image",
     *     description="изображение квартиры",
     * )
     * @var string
     */
    private string $image;
}
