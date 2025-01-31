<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $cred = $request->validate([
            'username' => 'string',
            'password' => 'string'
        ]);

        if (Auth::attempt($cred)) {
            /**
             * @var \App\Models\User
             */
            $user = Auth::user();

            $token = $user->createToken('acc_token')->plainTextToken;

            return response()->json([
                'message' => 'Login success',
                'token' => $token,
                'user' => $user
            ], 200);
        }

        return response()->json([
            'message' => 'Wrong username or password',
        ], 401);
    }

    public function logout()
    {
        /**
         * @var \App\Models\User
         */
        $user = Auth::user();

        $user->tokens()->delete();

        return response()->json([
            'message' => 'Logout success'
        ], 200);
    }
}
