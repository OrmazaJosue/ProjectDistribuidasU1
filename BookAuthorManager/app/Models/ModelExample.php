<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ModelExample extends Model
{
    use SoftDeletes;

    protected $table = '';

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'created_by', 'updated_by', 'deleted_by'
    ];
}
