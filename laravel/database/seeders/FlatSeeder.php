<?php

namespace Database\Seeders;

use Database\Factories\FlatFactory;
use Database\Factories\ProjectFactory;
use Illuminate\Database\Seeder;

class FlatSeeder extends Seeder
{
    public function run()
    {
        FlatFactory::new()->count(500)->create();
    }
}
