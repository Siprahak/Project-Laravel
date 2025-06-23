<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use HasFactory;

    protected $primaryKey = 'rating_id';

    protected $fillable = ['rating', 'feedback', 'complaint_id'];

    public function complaint()
    {
        return $this->belongsTo(Complaint::class, 'complaint_id', 'complaint_id');
    }
}
