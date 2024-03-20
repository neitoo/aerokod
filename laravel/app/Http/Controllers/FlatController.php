<?php

namespace App\Http\Controllers;

use App\Filters\FlatFilter;
use App\Http\Requests\FlatFilterRequest;
use App\Models\Flat;
use App\Http\Resources\FlatListResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Resources\Json\JsonResource;
use OpenApi\Annotations as OA;

class FlatController extends Controller
{
    /**
     * @OA\Get(
     *      path="/api/v1/filters",
     *      tags={"Flat"},
     *      summary="Получение квартир с фильтром",
     *
     *      @OA\Parameter(
     *          name="f[projects][]",
     *          description="фильтр по проектам",
     *          required=false,
     *          in="query",
     *
     *          @OA\Schema(
     *              type="integer"
     *          )
     *      ),
     *
     *      @OA\Parameter(
     *          name="f[square][min]",
     *          description="фильтр по площади min",
     *          required=false,
     *          in="query",
     *
     *          @OA\Schema(
     *              type="float",
     *          )
     *      ),
     *
     *      @OA\Parameter(
     *          name="f[square][max]",
     *          description="фильтр по площади max",
     *          required=false,
     *          in="query",
     *
     *          @OA\Schema(
     *              type="float",
     *          )
     *      ),
     *
     *      @OA\Parameter(
     *          name="f[rooms][]",
     *          description="фильтр по комнатам",
     *          required=false,
     *          in="query",
     *
     *          @OA\Schema(
     *              type="integer"
     *          )
     *      ),
     *
     *      @OA\Parameter(
     *          name="f[price][min]",
     *          description="фильтр по цене min",
     *          required=false,
     *          in="query",
     *
     *          @OA\Schema(
     *              type="float",
     *          )
     *      ),
     *
     *      @OA\Parameter(
     *          name="f[price][max]",
     *          description="фильтр по цене max",
     *          required=false,
     *          in="query",
     *
     *          @OA\Schema(
     *              type="float",
     *          )
     *      ),
     *
     *      @OA\Parameter(
     *          name="sort[square]",
     *          description="сортировка по площади",
     *          required=false,
     *          in="query",
     *
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *
     *      @OA\Parameter(
     *          name="sort[price]",
     *          description="сортировка по цене",
     *          required=false,
     *          in="query",
     *
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *
     *      @OA\Parameter(
     *          name="per_page",
     *          description="кол-во квартир на странице",
     *          required=false,
     *          in="query",
     *
     *          @OA\Schema(
     *              type="integer"
     *          )
     *      ),
     *
     *      @OA\Parameter(
     *          name="page",
     *          description="страница",
     *          required=false,
     *          in="query",
     *
     *          @OA\Schema(
     *              type="integer"
     *          )
     *      ),
     *
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *
     *          @OA\JsonContent(ref="#/components/schemas/FilterResource")
     *       ),
     * )
     */
    public function filters(FlatFilterRequest $request): JsonResource
    {
        return JsonResource::make((new FlatFilter(Flat::class, $request->validated()))->buildFilters());
    }

    /**
     * @OA\Get(
     *      path="/api/v1/flats",
     *      tags={"Flat"},
     *      summary="Получение квартир с фильтром",
     *
     *      @OA\Parameter(
     *          name="f[projects][]",
     *          description="фильтр по проектам",
     *          required=false,
     *          in="query",
     *
     *          @OA\Schema(
     *              type="integer"
     *          )
     *      ),
     *
     *      @OA\Parameter(
     *          name="f[square][min]",
     *          description="фильтр по площади min",
     *          required=false,
     *          in="query",
     *
     *          @OA\Schema(
     *              type="float",
     *          )
     *      ),
     *
     *      @OA\Parameter(
     *          name="f[square][max]",
     *          description="фильтр по площади max",
     *          required=false,
     *          in="query",
     *
     *          @OA\Schema(
     *              type="float",
     *          )
     *      ),
     *
     *      @OA\Parameter(
     *          name="f[rooms][]",
     *          description="фильтр по комнатам",
     *          required=false,
     *          in="query",
     *
     *          @OA\Schema(
     *              type="integer"
     *          )
     *      ),
     *
     *      @OA\Parameter(
     *          name="f[price][min]",
     *          description="фильтр по цене min",
     *          required=false,
     *          in="query",
     *
     *          @OA\Schema(
     *              type="float",
     *          )
     *      ),
     *
     *      @OA\Parameter(
     *          name="f[price][max]",
     *          description="фильтр по цене max",
     *          required=false,
     *          in="query",
     *
     *          @OA\Schema(
     *              type="float",
     *          )
     *      ),
     *
     *      @OA\Parameter(
     *          name="sort[square]",
     *          description="сортировка по площади",
     *          required=false,
     *          in="query",
     *
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *
     *      @OA\Parameter(
     *          name="sort[price]",
     *          description="сортировка по цене",
     *          required=false,
     *          in="query",
     *
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *
     *      @OA\Parameter(
     *          name="per_page",
     *          description="кол-во квартир на странице",
     *          required=false,
     *          in="query",
     *
     *          @OA\Schema(
     *              type="integer"
     *          )
     *      ),
     *
     *      @OA\Parameter(
     *          name="page",
     *          description="страница",
     *          required=false,
     *          in="query",
     *
     *          @OA\Schema(
     *              type="integer"
     *          )
     *      ),
     *
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *
     *          @OA\JsonContent(ref="#/components/schemas/FlatListResource")
     *       ),
     * )
     */
    public function flats(FlatFilterRequest $request): AnonymousResourceCollection
    {
        return FlatListResource::collection((new FlatFilter(Flat::class, $request->validated()))->filter());
    }
}
