<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class curso extends Model
{
    public $table = "curso";
    public $timestamps = false;
    protected $primaryKey = 'idcurso';
}
