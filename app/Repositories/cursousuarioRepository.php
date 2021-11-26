<?php

namespace App\Repositories;
use App\cursousuario;
use App\User;
use DB;
use Illuminate\Support\Facades\Auth;
class cursousuarioRepository {
    private $model;
    private $_idusuario;
    public function __construct(){
        //$this->_idusuario= Auth::user()->id ;
        $this->model = new cursousuario();
    }
    public function get($id) {
        return $this->model->find($id);
    }
    public function getAll() {
        return $this->model->orderBy('iduscur', 'desc')->get();
    }

    /**
     * @see Obtiene detalle del catalogo seleccionado
     * @param $idcat
     * @return mixed
     */
    public function getmisCursos($idusuario){
        return $this->model
            ->join('curso', 'cursousuario.idcurso', '=', 'curso.idcurso', 'inner')
            ->Where('curso.eliminado', '=',0)
            ->Where('cursousuario.idusuario', '=',$idusuario)
            ->select(   'curso.autor',
                'curso.horas',
                'curso.idcurso',
                'curso.nombre',
                'curso.fotoport'
            )
            ->get();
    }
    public function getCatxNom($nomenclatura){
        return $this->model
            ->join('catalogo', 'detcatalogo.idcat', '=', 'catalogo.idcat', 'inner')
            ->Where('detcatalogo.nomenclatura', '=', "$nomenclatura")
            ->select( 'catalogo.nombre',
                'detcatalogo.iddetcat',
                'detcatalogo.nombre',
                'detcatalogo.nomenclatura'
            )
            ->orderBy('detcatalogo.iddetcat', 'asc')
            ->get();
    }
    public function save($data) {
        $response['success'] = false;
        try {
            DB::beginTransaction();
            // Logica para especificar si es un UPDATE
            /*if($data->iduscur > 0)
            {
                $this->model->exists = true;
                $this->model->iduscur = $data->iduscur;
            }*/

            $this->model->idcurso = $data->idcurso;
            $this->model->idusuario = Auth::id();
            $this->model->creado = $data->creado;
            $this->model->modificado =$data->modificado;
            $this->model->save();
            $response['idcurso'] = $data->idcurso;
            $response['success'] = true;
            DB::commit();
            return $response;
        } catch (\Exception $e){
            DB::rollBack();
            echo"Error:".$e;
            $response['success'] = false;
            return $response;

            //return $return;
        }
    }

}