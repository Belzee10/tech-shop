<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('signin', 'UserController@signIn');
Route::post('signup', 'UserController@signUp');
Route::delete('logout', 'UserController@logout');
Route::get('authenticate-user', 'UserController@authenticateUser');

Route::get('categories/all', 'PublicController@categoriesAll');//get all categories Public
Route::get('products/all/{user_id?}', 'PublicController@productsAll');//get all products Public
Route::get('products/product-by/{category}/{user_id?}', 'PublicController@productByCategory');//filter product by category Public
Route::get('products/details/{id}/{user_id?}', 'PublicController@productDetails');//get product details Public

Route::post('products/{product}', 'ProductController@update');//update product

Route::get('search/{model}/{term?}', 'SearchController@search');//search

Route::group(['middleware' => 'auth.jwt'], function() {
    Route::apiResource('users', 'UserController');
    Route::apiResource('categories', 'CategoryController');
    Route::apiResource('products', 'ProductController');

    Route::post('orders', 'OrderController@store');//add to cart
    Route::delete('orders/remove/{product_id}', 'OrderController@remove');//remove from cart
    Route::delete('orders/{product_id}', 'OrderController@delete');//delete from cart
    Route::get('orders/shoppingCart', 'OrderController@shoppingCart');//get products in shopping cart
    Route::post('orders/complete', 'OrderController@completeOrder');//complete order (ckeck-out)
    Route::get('orders/all', 'OrderController@indexAll');//get all orders (admin)
    Route::get('orders', 'OrderController@index');//get orders by user
    Route::get('orders/{order_id}/details', 'OrderController@show');//show order details    
});



