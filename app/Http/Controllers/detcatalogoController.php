<?php

namespace App\Http\Controllers;
use App\Repositories\detcatalogoRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\Clases\Utilidades;

class detcatalogoController extends Controller
{
    private $_util;
    public function __construct(
        detcatalogoRepository $_tbinmueble
    )
    {
        $this->middleware('auth');
        $this->_util=new Utilidades();
    }
    public function index(Request $req)
    {

    }
}
