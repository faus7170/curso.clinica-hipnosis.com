<?php

namespace App\Repositories;
use App\contenido;
use DB;

class contenidoRepository {
    private $model;
    public function __construct(){
        $this->model = new contenido();
    }
    public function get($id) {
        return $this->model->find($id);
    }
    public function getContenido($id) {
        return $this->model
            ->Where('contenido.idcurso', '=', "$id")
            ->select(
                'contenido.idcurso',
                'contenido.idcont',
                'contenido.titulo',
                'contenido.texto',
                'contenido.duracion',
                'contenido.visible',
                'contenido.orden'
            )
            ->orderBy('contenido.titulo', 'asc')
            ->get();
    }
    public function getContenidoLeccion($idcurso,$idcont) {
        return $this->model
            ->Where('contenido.idcurso', '=', "$idcurso")
            ->Where('contenido.idcont', '=', "$idcont")
            ->select(
                'contenido.idcurso',
                'contenido.idcont',
                'contenido.titulo',
                'contenido.texto',
                'contenido.duracion',
                'contenido.visible',
                'contenido.orden'
            )
            ->orderBy('contenido.titulo', 'asc')
            ->get();
    }

    public function getAll() {
        return $this->model->orderBy('idcurso', 'desc')->get();
    }

    public function save($data) {
        $response['success'] = false;
        try {
            DB::beginTransaction();
            // Logica para especificar si es un UPDATE
            if($data->idcont > 0)
            {
                $this->model->exists = true;
                $this->model->idcont = $data->idcont;
            }
            $this->model->titulo = $data->titulo;
            $this->model->texto = $data->texto;
            $this->model->idcurso = $data->idcurso;
            $this->model->duracion= $data->duracion;
            $this->model->save();
            $response['idcont'] = $this->model->idcont;
            $response['success'] = true;
            DB::commit();
            return $response;
        } catch (\Exception $e){
            DB::rollBack();
            echo"Error:".$e;
            return $response;
        }
    }




}