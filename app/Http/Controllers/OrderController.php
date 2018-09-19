<?php

namespace App\Http\Controllers;

use App\Order;
use App\Product;
use App\User;
use Illuminate\Http\Request;
use JWTAuth;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()//get orders by user
    {
        if (!$user = JWTAuth::parseToken()->authenticate()) {
            return response()->json([
                'error' => 'Unauthenticated user'
            ], 401);
        }
        else {
            $myOrders = Order::where('user_id', $user->id)->where('isCompleted', true)->latest()->get();//get orders of the user
            return response()->json($myOrders);
        }        
    }  

    public function indexAll()//get all orders
    {
        $orders = Order::where('isCompleted', true)->latest()->get();
        foreach ($orders as $order) {
            $user = User::find($order->user_id);            
            $order['user_name'] = $user->name.' '.$user->lastName;
        }

        return response()->json($orders);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)//create order, add product to the order, update product in the order (+Add to cart)
    {
        if (!Order::where('user_id', $request->user_id)->first() || !Order::where('user_id', $request->user_id)->where('isCompleted', false)->first()) {//if the user don't have orders or all orders are completed
            $order = new Order();
            $order->date = date('Y-m-d');
            $order->isCompleted = false;
            $order->user_id = $request->user_id;
            $order->save();
            $order->products()->attach($request->product_id, ['cant' => 1]);
            $cant = $this->totalItems($order);//get total items in shopping cart
            $quantity = $this->getQuantity($order, $request->product_id);//get quantity of the product in the shopping cart

            return response()->json(['cant' => $cant, 'quantity' => $quantity]);//return cant of items in shooping cart
        }
        elseif ($myOrder = Order::where('user_id', $request->user_id)->where('isCompleted', false)->first()) {//if the user have an order incompleted 
            $product = $myOrder->products()->where('product_id', $request->product_id)->first();
            if (!$product) {//if the product don't exist in the order
                $myOrder->products()->attach($request->product_id, ['cant' => 1]);//add product
            }
            else {//if the product exist in the order
                $cant = $product->pivot->cant + 1;
                $myOrder->products()->updateExistingPivot($request->product_id, ['cant' => $cant]);//update the product
            }     
            $cant = $this->totalItems($myOrder);//get total items in shopping cart  
            $quantity = $this->getQuantity($myOrder, $request->product_id);//get quantity of the product in the shopping cart

            return response()->json(['cant' => $cant, 'quantity' => $quantity]);//return cant of items in shooping cart
        }     
    }

    public function remove($product_id) {//remove product from the order (-Remove from cart)  
        if (!$user = JWTAuth::parseToken()->authenticate()) {
            return response()->json([
                'error' => 'Unauthenticated user'
            ], 401);
        }
        else {
            $myOrder = Order::where('user_id', $user->id)->where('isCompleted', false)->first();//get incomplete order of the user
            $product = $myOrder->products()->where('product_id', $product_id)->first();//get the product
            $cant = $product->pivot->cant;//get cant of the product
            if ($cant > 1) {
                $myOrder->products()->updateExistingPivot($product_id, ['cant' => $cant - 1]);//update the product (-1 cant)
                $quantity = $this->getQuantity($myOrder, $product_id);//get quantity of the product in the shopping cart
            }
            elseif ($cant == 1) {
                $myOrder->products()->detach($product_id);
                $quantity = 0;
            }
            $cant = $this->totalItems($myOrder);  
         

            return response()->json(['cant' => $cant, 'quantity' => $quantity]);
        }
    }

    public function delete($product_id) {//delete product from cart
        if (!$user = JWTAuth::parseToken()->authenticate()) {
            return response()->json([
                'error' => 'Unauthenticated user'
            ], 401);
        }
        else {
            $myOrder = Order::where('user_id', $user->id)->where('isCompleted', false)->first();//get incomplete order of the user
            $product = $myOrder->products()->where('product_id', $product_id)->first();//get the product
            $myOrder->products()->detach($product_id);//detach the product
            $cant = $this->totalItems($myOrder);//get total items in shopping cart

            return response()->json(['cant' => $cant]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show($order_id)//order details
    {
         if (!$user = JWTAuth::parseToken()->authenticate()) {
            return response()->json([
                'error' => 'Unauthenticated user'
            ], 401);
        }
        else {
           $order = Order::find($order_id);//get the order
           $products = $order->products()->get();//get products of the order
           $user = User::find($order->user_id);//get user            

           $order['products'] = $products;
           $order['user_name'] = $user->name.' '.$user->lastName;

           return response()->json($order); 
        }        
    }  

    public function shoppingCart() {//get products of the incomplete order of each user
        if (!$user = JWTAuth::parseToken()->authenticate()) {
            return response()->json([
                'error' => 'Unauthenticated user'
            ], 401);
        }
        else {
            if ($myOrder = Order::where('user_id', $user->id)->where('isCompleted', false)->first()) {//get incomplete order of the user
                $products = $myOrder->products()->get();                
            }
            else {
                $products = [];
            }    
            return response()->json($products);                   
        }
    }

    public function completeOrder(Request $request) {
        $myOrder = Order::where('user_id', $request->user_id)->where('isCompleted', false)->first();//get incomplete order of the user
        $myOrder->address = $request->address;
        $myOrder->city = $request->city;
        $myOrder->isCompleted = true;
        $myOrder->save();

        return response()->json('Order Complete');
    }

    public function totalItems($order) {//get total items in shopping cart
        $cant = 0;
        $products = $order->products()->get();
        foreach ($products as $product) {
            $cant += $product->pivot->cant;
        }
        return $cant;
    }

    public function getQuantity($order, $product_id) {
        $quantity = 0;
        $product = $order->products()->where('product_id', $product_id)->first();//get the product
        $quantity = $product->pivot->cant;//get cant of the product
        
        return $quantity;
    }
    
}
