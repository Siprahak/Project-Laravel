<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attachment extends Model
{
    use HasFactory;

    protected $primaryKey = 'attachment_id';

    protected $fillable = ['file_path', 'complaint_id'];

    public function complaint()
    {
        return $this->belongsTo(Complaint::class, 'complaint_id', 'complaint_id');
    }
}
