<?php

namespace App\Http\Controllers;

use App\Models\Complaint;
use Illuminate\Http\Request;

class ComplaintController extends Controller
{
    public function index()
    {
        return response()->json(
            Complaint::with(['user', 'category'])->get()
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:45',
            'description' => 'required|string',
            'location' => 'required|string|max:45',
            'status' => 'in:diproses,ditolak,selesai',
            'user_id' => 'required|exists:users,user_id',
            'category_id' => 'required|exists:categories,category_id',
        ]);

        $complaint = Complaint::create($request->all());

        return response()->json($complaint, 201);
    }

    public function show($id)
    {
        $complaint = Complaint::with(['user', 'category'])->find($id);
        if (!$complaint) {
            return response()->json(['message' => 'Complaint not found'], 404);
        }

        return response()->json($complaint);
    }

    public function update(Request $request, $id)
    {
        $complaint = Complaint::findOrFail($id);
        $complaint->update($request->all());
        return response()->json($complaint);
    }

    public function destroy($id)
    {
        $deleted = Complaint::destroy($id);
        if ($deleted) {
            return response()->json(['message' => 'Complaint deleted']);
        } else {
            return response()->json(['message' => 'Complaint not found'], 404);
        }
    }

    public function myComplaints(Request $request)
    {
        $user = auth()->user(); // ambil user yang sedang login

        $complaints = Complaint::with(['user', 'category', 'attachments', 'response', 'rating'])
            ->where('user_id', $user->user_id) // pastikan ini field primary key user
            ->get();

        return response()->json($complaints);
    }


}
