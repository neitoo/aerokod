<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

class FlatFactory extends Factory
{

    public function definition(): array
    {
        $project = Project::first();
        if (! $project) {
            $project = Project::create(['title' => $this->faker->name]);
        }
        $rooms = rand(0, 4);
        $is_studio = false;
        if ($rooms === 0) {
            $is_studio = true;
        }
        return [
            'project_id'    => $project->id,
            'rooms'         => $rooms,
            'studio'        => $is_studio,
            'price'         => rand(2000000, 15000000),
            'old_price'     => rand(2000000, 15000000),
            'square'        => rand(20, 100),
            'release_dates' => '3кв. 2026',
            'floor'         => rand(1, 25),
            'image'         => $this->faker->imageUrl,
        ];
    }
}
