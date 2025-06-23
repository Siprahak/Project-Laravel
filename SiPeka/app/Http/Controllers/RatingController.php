<?php

namespace App\Http\Controllers;

use App\Models\Rating;
use App\Models\Complaint;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    public function index()
    {
        return response()->json(Rating::with('complaint')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'feedback' => 'required|string',
            'complaint_id' => 'required|exists:complaints,complaint_id|unique:ratings,complaint_id',
        ]);

        $rating = Rating::create($request->all());

        return response()->json($rating, 201);
    }

    public function show($id)
    {
        $rating = Rating::with('complaint')->find($id);
        if (!$rating) return response()->json(['message' => 'Not found'], 404);
        return response()->json($rating);
    }

    public function update(Request $request, $id)
    {
        $rating = Rating::find($id);
        if (!$rating) return response()->json(['message' => 'Not found'], 404);

        $request->validate([
            'rating' => 'integer|min:1|max:5',
            'feedback' => 'string',
        ]);

        $rating->update($request->all());

        return response()->json($rating);
    }

    public function destroy($id)
    {
        $rating = Rating::find($id);
        if (!$rating) return response()->json(['message' => 'Not found'], 404);

        $rating->delete();

        return response()->json(['message' => 'Rating deleted']);
    }
}
