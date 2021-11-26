<?php

namespace App\Http\Controllers;
use App\Repositories\cursousuarioRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\Clases\Utilidades;
use Illuminate\Support\Facades\Auth;
class cursousuarioController extends Controller
{
    private $_util;
    private $_cursousuario;
    public function __construct(
        cursousuarioRepository $_cursousuario
    )
    {
        $this->middleware('auth');
        $this->_cursousuario=$_cursousuario;
        $this->_util=new Utilidades();
    }
    public function index(Request $req)
    {

    }
    public function getmisCursos(){
        //var_dump("yyyy");
        $miscursos=$this->_cursousuario->getmisCursos(Auth::id());
        return response()->json([
            'data'=>$miscursos
        ]);
    }
}