<?php

use Faker\Generator as Faker;

$factory->define(App\Product::class, function (Faker $faker) {
    return [
        'name' => $faker->randomElement(array ('Product 1','Product 2','Product 3')),
        'price' => $faker->numberBetween(1001, 1299),
        'image' => '',
        'brand' => 'Apple',
        'description' => $faker->text(200)
    ];
});
