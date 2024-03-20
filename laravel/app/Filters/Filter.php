<?php

namespace App\Filters;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

abstract class Filter
{
    /**
     * @var string | Model
     */
    protected string|Model $model;

    protected int $perPage = 10;

    protected ?int $page = 1;

    protected Builder $query;

    protected array $filter = [];

    protected array $sort = [];

    protected array $tmpParams = [];

    protected array $request;

    protected ?string $searchQuery;

    public function __construct(string $model, array $request)
    {
        $this->request = $request;

        $this->filter = Arr::get($request, 'f', []);
        $this->sort = Arr::get($request, 'sort', []);

        $this->model = $model;
        $this->query = $this->model::query();
        $search = Arr::get($this->filter, 'query', null);
        $this->searchQuery = $search ? Str::lower($search) : null;
    }

    public function filter(): LengthAwarePaginator|Collection
    {
        $this->initFilter();

        return $this->paginateQuery();
    }

    private function initFilter(): void
    {
        $this->buildFilters();

        $this->prepareFilter();
        // Сортировка
        $this->sortQuery();

        $this->query = $this->buildQuery();
        // Реляции
        $this->addRelations();
    }

    public function prepareFilter(): void
    {
        // Реляции
        $this->searchQuery();

        $this->filterQuery();
    }

    protected function searchQuery(): void
    {

    }

    abstract protected function filterQuery(): void;

    abstract protected function sortQuery(): void;

    abstract protected function buildQuery($params = null): Builder;

    abstract protected function addRelations(): void;

    protected function paginateQuery(): LengthAwarePaginator|Collection
    {
        if (isset($this->request['per_page'])) {
            $this->perPage = $this->request['per_page'];
        }
        if (isset($this->request['page'])) {
            $this->page = $this->request['page'];
        }
        if (isset($this->request['all'])) {
            return $this->query->get();
        }
        return $this->query->paginate($this->perPage, $this->getSelectAttributes(), 'page', $this->page);
    }

    protected function getSelectAttributes(): array
    {
        return [$this->getBaseTable() . '.*'];
    }

    protected function getBaseTable(): string
    {
        return (new $this->model())->getTable();
    }

    abstract protected function buildFilters(): array;

    protected function isOnlyOne(array $values): bool
    {
        return empty($this->filter) && count($values) <= 1;
    }
}
