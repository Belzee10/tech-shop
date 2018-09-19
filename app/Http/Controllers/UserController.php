<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Http\Resources\User as UserResource;
use Tymon\JWTAuth\Exceptions\JWTException;
use JWTAuth;

class UserController extends Controller
{    

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {        
        return UserResource::collection(User::latest()->paginate(8));
    }      

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = new User([
            'name' => $request->input('name'),
            'lastName' => $request->input('lastName'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
            'role' => $request->input('role')
        ]);
        $user->save();       

        $credentials = $request->only('email', 'password'); 

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'error' => 'Invalid credentials!'
                ], 401);
            }
        } catch(JWTException $e) {
            return response()->json([
                'error' => 'could not create token'
            ], 500);
        }

        return response()->json(
            $user->name
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return new UserResource(User::find($user->id));
    }    

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $bar = $request->role;

        $user->name = $request->name;
        $user->lastName = $request->lastName;
        $user->email = $request->email;
        $user->role = $request->role;
        $user->save();

        return response()->json(
            $user->name
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json("User deleted!", 200);
    }  
    //signup
    public function signUp(Request $request) {
        
        $this->validate($request, [
            'name' => 'required',
            'lastName' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'role' => 'required'
        ]);         

        $user = new User([
            'name' => $request->input('name'),
            'lastName' => $request->input('lastName'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
            'role' => $request->input('role')
        ]);
        $user->save();

        $credentials = $request->only('email', 'password'); 

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'error' => 'Invalid credentials!'
                ], 401);
            }
        } catch(JWTException $e) {
            return response()->json([
                'error' => 'could not create token'
            ], 500);
        }

        $user = User::where('email', $credentials['email'])->first();
        $user = array_add($user, 'token', $token); 

        return response()->json([
            'message' => 'Successfully created user!',
            'user'    => $user
        ], 200);
    }
    //signin
    public function signIn(Request $request) { 
        
        $this->validate($request, [
            'email' => 'required',
            'password' => 'required',
        ]); 
        $credentials = $request->only('email', 'password');

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'error' => 'Invalid credentials!'
                ], 401);
            }
        } catch(JWTException $e) {
            return response()->json([
                'error' => 'could not create token'
            ], 500);
        }

        $user = User::where('email', $credentials['email'])->first();    
        $user = array_add($user, 'token', $token);    
    
        return response()->json([
            'user'  => $user
        ], 200);
    }
    //logout
    public function logout() {
        if (!JWTAuth::invalidate(JWTAuth::getToken())) {
            return response()->json('No token found');
        }        
        return response()->json('Successfully user logout!');  
    }    
}
