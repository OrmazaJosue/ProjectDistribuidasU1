<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Book extends Model
{
    use SoftDeletes;

    protected $table = '';

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'isbn',
        'title',
        'author_id',
        'publisher',  // Editorial
        'year',       // Año de publicación
        'price',      // Precio
        'pages'       // Número de páginas
    ];

}
