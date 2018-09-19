<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;
use App\Product;
use App\Order;
use App\User;
use JWTAuth;
use App\Http\Resources\Category as CategoryResource;
use App\Http\Resources\Product as ProductResource;

class PublicController extends Controller
{
    public function categoriesAll() 
    {
        return CategoryResource::collection(Category::latest()->get());
    }

    public function productsAll($user_id = null) 
    {
        if (!$user_id) {
            return Product::latest()->get();//get all products
        }
        else {
            if ($order = Order::where('user_id', $user_id)->where('isCompleted', false)->first()) {//get incomplete order of the user
                $products = $this->setQuantities($order); 
                return $products;              
            }
            else {
                return Product::latest()->get();//get all products
            }
        }      
    }

    public function productByCategory($category, $user_id = null) {
        if (!$user_id) {
            return Product::latest()->where('category_id', $category)->get();//get all products by category
        }
        else {
            if ($order = Order::where('user_id', $user_id)->where('isCompleted', false)->first()) {//get incomplete order of the user
                $products = $this->setQuantities($order, $category); 
                return $products;              
            }
            else {
                return Product::latest()->where('category_id', $category)->get();//get all products by category
            }
        }
    }
    
    public function productDetails($id, $user_id = null) {
        if (!$user_id) {
            return Product::find($id);
        }
        else {
            if ($order = Order::where('user_id', $user_id)->where('isCompleted', false)->first()) {//get incomplete order of the user
                $product = $this->setQuantity($order, $id);
                return $product;
            }
            else {
                return Product::find($id);
            }
        }

    }

    public function setQuantities($order, $category = null) {//set quantity to all products
        if ($category) {
            $products = Product::latest()->where('category_id', $category)->get();//get all products by category
        }
        else {
            $products = Product::latest()->get();//get all products
        }
        $orderProducts = $order->products()->get();//get products of the order
        foreach ($orderProducts as $prod) {
            $cant = $prod->pivot->cant;                   
            foreach ($products as $product) {
                if ($prod->id == $product->id) {
                    $product['cant'] = $cant;
                }
            }
        }
        
        return $products; 
    }
    
    public function setQuantity($order, $product_id) {//set quantity to product
        $product = Product::find($product_id);
        $orderProducts = $order->products()->get();//get products of the order
        foreach ($orderProducts as $prod) {
            $cant = $prod->pivot->cant;
            if ($prod->id == $product->id) {
                $product['cant'] = $cant;
            }
        }

        return $product;
    }
}
