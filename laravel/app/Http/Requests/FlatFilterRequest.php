<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class FlatFilterRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'f.projects.*'  => 'sometimes|int',
            'f.square.max'  => 'sometimes|numeric',
            'f.square.min'  => 'sometimes|numeric',
            'f.rooms.*'     => 'sometimes|int',
            'f.price.min'   => 'sometimes|int',
            'f.price.max'   => 'sometimes|int',

            'sort'        => 'sometimes|array',
            'sort.square' => 'sometimes|string|in:asc,desc,ASC,DESC',
            'sort.price'  => 'sometimes|string|in:asc,desc,ASC,DESC',

            'per_page' => 'sometimes|int',
            'page'     => 'sometimes|int',
            'all'      => 'sometimes|boolean',
        ];
    }
}
