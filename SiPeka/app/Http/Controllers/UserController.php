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

    public function createUserByAdmin(Request $request)
{
    $fields = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|unique:users,email',
        'password' => 'required|string|min:6',
        'role' => 'required|in:user,admin',
    ]);

    $user = User::create([
        'name' => $fields['name'],
        'email' => $fields['email'],
        'password' => bcrypt($fields['password']),
        'role' => $fields['role'],
    ]);

    return response()->json([
        'message' => 'User created successfully',
        'user' => $user,
    ], 201);
}

    public function updateUserByAdmin(Request $request, $id)
{
    $user = User::findOrFail($id);

    $fields = $request->validate([
        'name' => 'sometimes|string|max:255',
        'email' => 'sometimes|string|email|unique:users,email,' . $id,
        'password' => 'sometimes|string|min:6',
        'role' => 'sometimes|in:user,admin',
    ]);

    if (isset($fields['password'])) {
        $fields['password'] = bcrypt($fields['password']);
    }

    $user->update($fields);

    return response()->json([
        'message' => 'User updated successfully',
        'user' => $user,
    ]);
}

}
