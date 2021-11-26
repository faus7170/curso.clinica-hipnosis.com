<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class contenido extends Model
{
    public $table = "contenido";
    public $timestamps = false;
    protected $primaryKey = 'idcont';
}
