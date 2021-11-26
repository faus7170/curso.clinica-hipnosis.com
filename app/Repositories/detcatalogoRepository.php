<?php

namespace App\Repositories;
use App\detcatalogo;
use DB;

class detcatalogoRepository {
    private $model;
    public function __construct(){
        $this->model = new detcatalogo();
    }
    public function get($id) {
        return $this->model->find($id);
    }
    public function getAll() {
        return $this->model->orderBy('iddetcat', 'desc')->get();
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

}
