<?php

use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Category::class, 3)->create()->each(function ($c) {
            $c->products()->save(factory(App\Product::class)->make());
        });        
    }
}
