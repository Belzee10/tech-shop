<?php

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\Category as CategoryResource;

class SearchController extends Controller
{
    public function search($model, $term = null) {
        
        if ($model == 'category') {
            return CategoryResource::collection(Category::where('name', 'LIKE', "%$term%")->latest()->get());
        }
        elseif ($model == 'product') {
            return ProductResource::collection(Product::where('name', 'LIKE', "%$term%")->latest()->get());
        }
   
    }
}
