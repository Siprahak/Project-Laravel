<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(User::all());
    }

    public function store(Request $request)
         {$data = $request->all();
        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);

    // Mengembalikan respons JSON
    return response()->json($user);
        // $user = User::create($request->all());
        // return response()->json($user);
    }

    public function show($id)
    {
        return response()->json(User::find($id));
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->update($request->all());
        return response()->json($user);
    }

    public function destroy($id)
    {
        User::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }
}
