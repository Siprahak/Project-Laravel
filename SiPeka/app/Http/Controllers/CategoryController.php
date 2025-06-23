<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        return response()->json(Category::all());
    }

    public function store(Request $request)
    {
        $category = Category::create($request->all());
        return response()->json($category);
    }

    public function show($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }
        return response()->json($category);
    }

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        $category->update($request->all());
        return response()->json($category);
    }
    public function destroy($id)
    {
        $deleted = Category::destroy($id);
        if ($deleted) {
            return response()->json(['message' => 'Deleted']);
        } else {
            return response()->json(['message' => 'Category not found'], 404);
        }
    }
}
