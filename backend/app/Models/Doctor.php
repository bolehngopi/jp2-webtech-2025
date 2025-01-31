<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    protected $fillable = [
        'doctor_id',
        'name',
        'gender',
        'phone_number',
        'address',
        'email',
        'bio',
    ];

    public function schedules()
    {
        return $this->hasMany(Schedule::class);
    }
}
