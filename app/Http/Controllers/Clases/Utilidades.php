<?php
/**
 * Created by PhpStorm.
 * User: it
 * Date: 03/10/2017
 * Time: 6:41
 */

namespace App\Http\Controllers\Clases;


class Utilidades
{
    public function __construct( )
    {
        //$this->middleware('auth');
        $this->setMes();
    }
    function Utf8String($string){
        $charset='UTF-8';
        $outCharset='ISO-8859-2';
        return iconv($charset, $outCharset, $string);
    }
    function Numero($valor){
        $decimal=2;
        $pmil='.';
        $pdec=',';
        $valor=floatval($valor);
        return number_format($valor,$decimal,$pmil,$pdec);
    }
    function numeroRep($numero){
        $patrones = array();
        $patrones[0] = '/,/';
        $sustituciones = array();
        $sustituciones[0] = '.';
        return preg_replace($patrones, $sustituciones, $numero);
    }
    function numeroVal($numero){
        $patrones = array();
        $patrones[0] = '/./';
        $sustituciones = array();
        $sustituciones[0] = ',';
        return preg_replace($patrones, $sustituciones, $numero);
    }
    /**
     * @param mixed $mes
     */
    public function setMes($mes=null)
    {
        $mes[1]='Enero';
        $mes[2]='Febrero';
        $mes[3]='Marzo';
        $mes[4]='Abril';
        $mes[5]='Mayo';
        $mes[6]='Junio';
        $mes[7]='Julio';
        $mes[8]='Agosto';
        $mes[9]='Septiembre';
        $mes[10]='Octubre';
        $mes[11]='Noviembre';
        $mes[12]='Diciembre';
        $this->_mes = $mes;
    }

    /**
     * @return mixed
     */
    public function getMes()
    {
        return $this->_mes;
    }

    public function inicializaMenu($req){
        $req->session()->regenerate();
        $req->session()->put('activeEgr',  '');
        $req->session()->put('varegradd', '');
        $req->session()->put('varegrepe', '');
        $req->session()->put('varegrpag', '');
        $req->session()->put('varegrrepp', '');

        $req->session()->put('activeIng',  '');
        $req->session()->put('varIngadd', '');
        $req->session()->put('varIngcob', '');
        $req->session()->put('varIngrep', '');

        $req->session()->put('activeAdmin',  '');
        $req->session()->put('varAdmGen', '');
        $req->session()->put('varAdmInq', '');
        $req->session()->put('varAdmProv', '');
        $req->session()->put('varAdmCuen', '');

        $req->session()->put('activeTran',  '');
        $req->session()->put('varTran', '');
        $req->session()->put('varBan', '');

    }
}