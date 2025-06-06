<?php

namespace App\Http\Controllers;

use App\Models\Response;
use Illuminate\Http\Request;

class ResponseController extends Controller
{
    public function index()
    {
        return response()->json(Response::with('complaint')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
            'complaint_id' => 'required|exists:complaints,complaint_id|unique:responses,complaint_id',
        ]);

        $response = Response::create($request->all());

        return response()->json($response, 201);
    }

    public function show($id)
    {
        $response = Response::with('complaint')->find($id);
        if (!$response) return response()->json(['message' => 'Not found'], 404);
        return response()->json($response);
    }

    public function update(Request $request, $id)
    {
        $response = Response::find($id);
        if (!$response) return response()->json(['message' => 'Not found'], 404);

        $request->validate([
            'message' => 'string',
        ]);

        $response->update($request->all());

        return response()->json($response);
    }

    public function destroy($id)
    {
        $response = Response::find($id);
        if (!$response) return response()->json(['message' => 'Not found'], 404);

        $response->delete();

        return response()->json(['message' => 'Response deleted']);
    }
}
