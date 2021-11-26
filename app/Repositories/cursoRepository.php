<?php

namespace App\Repositories;
use App\curso;
use DB;
use Illuminate\Support\Facades\Auth;

class cursoRepository {
    private $model;
    public function __construct(){
        $this->model = new curso();
    }
    public function get($id) {
        return $this->model->find($id)->get();
    }
    public function getAll() {
        return $this->model->Where('curso.eliminado', '=', 0)
           // ->where('curso.id', '=',Auth::id())
            ->orderBy('idcurso', 'desc')->get();
    }
    public function getId($id) {
        return $this->model
            ->Where('curso.idcurso', '=', $id)
            ->Where('curso.eliminado', '=', 0)
            ->select(   'curso.nombre',
                'curso.descripcion',
                'curso.autor',
                'curso.fechaapertura',
                'curso.fotoport'
            )
            ->orderBy('curso.nombre', 'asc')
            ->get();
    }
    /**
     * @see Obtiene detalle del catalogo seleccionado
     * @param $idcat
     * @return mixed
     */
    public function getDetalle($idcat){
        return $this->model
            ->join('catalogo', 'detcatalogo.idcat', '=', 'catalogo.idcat', 'inner')
            ->Where('detcatalogo.codigo', '=', "$idcat")
            ->select(   'catalogo.nombre',
                'detcatalogo.iddetcat',
                'detcatalogo.nombre',
                'detcatalogo.nomenclatura'
            )
            ->orderBy('detcatalogo.iddetcat', 'asc')
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
            if($data->idcurso > 0)
            {
                $this->model->exists = true;
                $this->model->idcurso = $data->idcurso;
            }

            $this->model->id = Auth::id();
            $this->model->nombre = $data->nombre;
            $this->model->descripcion = $data->descripcion;
            $this->model->horas = $data->horas;
            $this->model->autor = $data->autor;
            $this->model->valor = $data->valor;
            $this->model->impuesto = $data->impuesto;
            $this->model->fechaapertura = $data->fechaapertura;
            $this->model->fechacierre = $data->fechacierre;
            $this->model->fotoport = $data->fotoport;
            $this->model->horas = $data->horas;
            $this->model->creado = $data->creado;
            $this->model->modificado =$data->modificado;
            $this->model->save();
            $response['idcurso'] = $this->model->idcurso;
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
    function eliminarCurso($id,$modi){
        $response['success'] = false;
        try {
            DB::beginTransaction();
            curso::where('idcurso','=',$id)->update(array("eliminado"=>1,"modificado"=>$modi));
            $response['success'] = true;
            DB::commit();
        } catch (\Exception $e){
            DB::rollBack();
            $response['success'] = false;
            echo"Error:".$e;
        }
        return $response;
        //$this->model->where('idcurso',$id)->delete();
    }

}