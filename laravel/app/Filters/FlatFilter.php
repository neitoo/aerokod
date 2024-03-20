<?php

namespace App\Filters;

use App\Models\Flat;
use App\Models\Project;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Query\JoinClause;

class FlatFilter extends Filter
{
    protected int $perPage = 6;

    public function buildFilters(int $deep = 0): array
    {
        $deep++;
        $filters = [];
        $notEmptyValues = null;
        $isFail = false;

        foreach (Project::cursor() as $project) {
            $filters['projects'][$project->id] = [
                'id'        => $project->id,
                'title'     => $project->title,
                'is_active' => false,
                'disabled'  => true,
            ];
        }

        foreach (Flat::query()->select('rooms')->distinct()->get() as $value) {
            $filters['rooms'][$value->rooms] = [
                'number'    => $value->rooms,
                'is_active' => false,
                'disabled'  => true,
            ];
        }

        Flat::query()
            ->selectRaw('min(price) as min, max(price) as max, min(square) as min_square, max(square) as max_square')
            ->get()
            ->map(function ($item) use (&$filters) {
                $filters['price']['min_range'] = (double)$item->min;
                $filters['price']['max_range'] = (double)$item->max;
                $filters['square']['min_range'] = (double)$item->min_square;
                $filters['square']['max_range'] = (double)$item->max_square;
            });

        $this->relationFilters(['projects' => true]);

        $this->query
            ->selectRaw('c.id, c.title')
            ->distinct()
            ->get('id, title')
            ->map(function ($item) use (&$filters) {
                $is_active = false;
                if (isset($this->filter['projects'])) {
                    foreach ($this->filter['projects'] as $value) {
                        if ($item->id == $value) {
                            $is_active = true;
                        }
                    }
                }
                $filters['projects'][$item->id] = [
                    'id'        => $item->id,
                    'title'     => $item->title,
                    'is_active' => $is_active,
                    'disabled'  => false,
                ];
            })->toArray();

        $filters['projects'] = isset($filters['projects']) ? array_values($filters['projects']) : null;


        $this->query = $this->model::query();
        $this->relationFilters(['square' => true]);

        $this->query
            ->selectRaw('min(flats.square) as min, max(flats.square) as max')
            ->distinct()
            ->get()
            ->map(function ($item) use (&$filters) {
                $filters['square']['min'] = (double)$item->min;
                $filters['square']['max'] = (double)$item->max;
            })->toArray();

        if (empty($filters['square']['min'])) {
            $isFail = true;
            unset($this->filter['square']);
        } else {
            $notEmptyValues['square'] = $filters['square'];
        }

        $this->query = $this->model::query();
        $this->relationFilters(['rooms' => true]);

        $this->query
            ->selectRaw('flats.rooms')
            ->distinct()
            ->get()
            ->map(function ($item) use (&$filters) {
                $is_active = false;
                if (isset($this->filter['rooms'])) {
                    foreach ($this->filter['rooms'] as $value) {
                        if ($item->rooms == $value) {
                            $is_active = true;
                        }
                    }
                }
                $filters['rooms'][$item->rooms] = [
                    'number'    => $item->rooms,
                    'is_active' => $is_active,
                    'disabled'  => false,
                ];
            })->toArray();

        $filters['rooms'] = isset($filters['rooms']) ? array_values($filters['rooms']) : null;

        $this->query = $this->model::query();
        $this->relationFilters(['price' => true]);

        $this->query
            ->selectRaw('min(flats.price) as min, max(flats.price) as max')
            ->get()
            ->map(function ($item) use (&$filters) {
                $filters['price']['min'] = (double)$item->min;
                $filters['price']['max'] = (double)$item->max;
            });

        if (empty($filters['price']['min'])) {
            $isFail = true;
            unset($this->filter['price']);
        } else {
            $notEmptyValues['price'] = $filters['price'];
        }

        $this->query = $this->model::query();

        if ($isFail && ! empty($notEmptyValues) && $deep != 3) {
            foreach ($notEmptyValues as $key => $notEmptyValue) {
                $this->filter[$key] = $notEmptyValue;
            }
            return $this->buildFilters($deep);
        }

        return $filters;
    }

    private function relationFilters(array $disable = null): void
    {
        $this->query->join('projects as c', function (JoinClause $join) {
            $join->on('c.id', '=', 'flats.project_id');
        });

        $this->filterQuery($disable);
    }

    protected function filterQuery(array $disable = null): void
    {
        $this->query
            ->when(isset($this->filter['projects']) && ! isset($disable['projects']), function (Builder $q) {
                $q->whereIn('project_id', $this->filter['projects']);
            })
            ->when(isset($this->filter['rooms']) && ! isset($disable['rooms']), function (Builder $q) {
                $q->whereIn('flats.rooms', $this->filter['rooms']);
            })
            ->when(isset($this->filter['price']) && ! isset($disable['price']), function (Builder $q) {
                $q->whereBetween('flats.price', [$this->filter['price']['min'], $this->filter['price']['max']]);
            })
            ->when(isset($this->filter['square']) && ! isset($disable['square']), function (Builder $q) {
                $q->whereBetween('flats.square', [
                    $this->filter['square']['min'], $this->filter['square']['max'],
                ]);
            });
    }

    protected function sortQuery(): void
    {
        foreach ($this->sort as $key => $order) {
            switch ($key) {
                case 'square':
                case 'price':
                    $this->query->orderBy('flats.' . $key, $order);
                    break;
                default:
                    break;
            }
        }
    }

    protected function buildQuery($params = null): Builder
    {
        $this->tmpParams = $params ?? $this->filter;

        return $this->query->clone();
    }

    protected function addRelations(): void
    {
        $this->query->with(['project']);
    }
}
