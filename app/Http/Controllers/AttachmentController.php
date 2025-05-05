<?php

namespace App\Http\Controllers;

use App\Models\Attachment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AttachmentController extends Controller
{
    public function index()
    {
        return response()->json(Attachment::with('complaint')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:jpg,jpeg,png,pdf,mp4|max:20480',
            'complaint_id' => 'required|exists:complaints,complaint_id',
        ]);

        $path = $request->file('file')->store('attachments', 'public');

        $attachment = Attachment::create([
            'file_path' => 'storage/' . $path,
            'complaint_id' => $request->complaint_id,
        ]);

        return response()->json($attachment, 201);
    }

    public function show($id)
    {
        $attachment = Attachment::with('complaint')->find($id);
        if (!$attachment) return response()->json(['message' => 'Not found'], 404);
        return response()->json($attachment);
    }

    public function destroy($id)
    {
        $attachment = Attachment::find($id);
        if (!$attachment) return response()->json(['message' => 'Not found'], 404);

        // Hapus file dari storage
        $relativePath = str_replace('storage/', '', $attachment->file_path);
        Storage::disk('public')->delete($relativePath);

        $attachment->delete();

        return response()->json(['message' => 'Attachment deleted']);
    }
}
