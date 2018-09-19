<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;
use App\Http\Resources\Product as ProductResource;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ProductResource::collection(Product::latest()->paginate(8));
    }       

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $product = new Product;
        $product->name = $request->name;
        $product->price = $request->price;        
        $path = Storage::putFile('public/products', $request->file('image'));  
        $product->image = $path;
        $product->brand = $request->brand;
        $product->description = $request->description;
        $product->category_id = $request->category_id;
        $product->save();        
        
        return response()->json(
            $product->name              
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        return new ProductResource(Product::find($product->id));
    }   

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        $product->name = $request->name;
        $product->price = $request->price; 
        $product->brand = $request->brand;
        $product->description = $request->description;
        $product->category_id = $request->category_id;

        if ($request->file('image')) {
            if ($product->image) {
                Storage::delete($product->image);
            }
            $path = Storage::putFile('public/products', $request->file('image'));  
            $product->image = $path;
        }        

        $product->save();       

        return response()->json(
            $product->name
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        Storage::delete($product->image);
        $product->delete();

        return response()->json('Product deleted!', 200);
    }   

}
