<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    protected $table = 'departments';
    
    protected $fillable = [
        'department_id',
        'department_name',
        'depatment_description',
    ];

    public function schedules() {
        return $this->hasMany(Schedule::class);
    }
}
