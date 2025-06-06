<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Complaint extends Model
{
    use HasFactory;

    protected $primaryKey = 'complaint_id';

    protected $fillable = [
        'title',
        'description',
        'location',
        'status',
        'user_id',
        'category_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'category_id');
    }

    public function attachments()
    {
        return $this->hasMany(Attachment::class, 'complaint_id', 'complaint_id');
    }

    public function rating()
    {
        return $this->hasOne(Rating::class, 'complaint_id', 'complaint_id');
    }

    public function response()
    {
        return $this->hasOne(Response::class, 'complaint_id', 'complaint_id');
    }

}
