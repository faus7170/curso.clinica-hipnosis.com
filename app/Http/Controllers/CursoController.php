<?php
namespace App\Http\Controllers;
use App\Repositories\cursoRepository;
use App\Repositories\contenidoRepository;
use App\Repositories\cursousuarioRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\Clases\Utilidades;
use Illuminate\Support\Facades\Auth;
class CursoController extends Controller
{
    private $_util;
    private $_curso;
    private $_contenido;
    private $_cursousuario;
    public function __construct(
        cursoRepository $_curso,
        contenidoRepository $_contenido,
        cursousuarioRepository $_cursousuario
    )
    {
        $this->middleware('auth');
        $this->_util=new Utilidades();
        $this->_curso=$_curso;
        $this->_contenido=$_contenido;
        $this->_cursousuario=$_cursousuario;
    }
    public function index(Request $req)
    {
        return view('curso/index');
    }
    public function miscursos()
    {
        //var_dump("xxxxx");
        return view('curso/miscursos');
    }
    public function create()
    {
        return view('curso/create');
    }
    public function verCurso(Request $request)
    {
        return view('curso/vercurso',
            [
                'idcurso' =>$request->input('idcurso'),
            ]);
    }
    public function leccion(Request $request)
    {
        return view('curso/leccion',
            [
                'idcurso' =>$request->input('cur'),
                'idcont' =>$request->input('lec')
            ]);
    }

    public function videochat()
    {
        return view('curso/videochat');
    }
    public function save(Request $req)
    {
        $return = (object)[
            'response' => false
        ];
        if (isset($_FILES['fotoport'])) {
            $fileTmpPath = $_FILES['fotoport']['tmp_name'];
            $fileName = $_FILES['fotoport']['name'];
            $fileNameCmps = explode(".", $fileName);
            $fileExtension = strtolower(end($fileNameCmps));
            $newFileName = md5(time() . $fileName) . '.' . $fileExtension;
            $allowedfileExtensions = array( 'JPG','PNG','TIF','BMP','JPEG','jpeg','jpg','png','tif','bmp');
            if (in_array($fileExtension, $allowedfileExtensions)) {
                $uploadFileDir = 'dist/img/portadacurso/';
                $dest_path = $uploadFileDir . $newFileName;
                if(move_uploaded_file($fileTmpPath, $dest_path))
                {
                    $return->newfilename=$dest_path;
                    $return->response = true;
                }
                else
                {
                    $return->error="El archivo no pudo ser suvido al servidor";
                    $return->response = false;
                }
            }else{
                $return->error="Verifique la extension del archivo, solo se admiten archivos con extension jpeg, jpg, png, tif, bmp ";
            }
        }
        if($return->response!=true){
            return $return->error;
        }
        $req['creado']=date("Y-m-d H:i:s.u");
        $req['modificado']=date("Y-m-d H:i:s.u");
        $data = (object)[
            'idcurso' => $req->input('idcurso'),
            'nombre' => $req->input('nombre'),
            'horas' => $req->input('horas'),
            'descripcion' => $req->input('descripcion'),
            'autor' => $req->input('autor'),
            'valor' => $req->input('valor'),
            'impuesto' => $req->input('impuesto'),
            'fechaapertura' => $req->input('fechaapertura'),
            'fechacierre' => $req->input('fechacierre'),
            'fotoport' => $return->newfilename,
            'creado' => $req->input('creado'),
            'modificado' => $req->input('modificado'),

        ];
        return $this->_curso->save($data);
    }
    public function registrarCurso(Request $req)
    {
        $req['creado']=date("Y-m-d H:i:s.u");
        $req['modificado']=date("Y-m-d H:i:s.u");
        $data = (object)[
            'iduscur' => $req->input('idcurso'),
            'idcurso' => $req->input('idcurso'),
            'idusuario' => Auth::id(),
            'creado' => $req->input('creado'),
            'modificado' => $req->input('modificado'),

        ];
        return   $this->_cursousuario->save($data);
    }
    public function saveLeccion(Request $req)
    {
        $texto=base64_decode($req->input('texto'));
        $texto = str_replace('style="position: absolute; width: 100%; height: 100%; top: 0px; left: 0px;"', 'style={divStyle}', $texto);
        $texto = str_replace('style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;"', 'style={divStyle}',$texto);
                              //style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;"

        $req['creado']=date("Y-m-d H:i:s.u");
        $req['modificado']=date("Y-m-d H:i:s.u");
        $data = (object)[
            'idcont' => $req->input('idcont'),
            'idcurso' => $req->input('idcurso'),
            'iddetcat' => session('iddetcat'),
            'titulo' => $req->input('titulo'),
            'texto' => $texto,
            'duracion'=>12,
        ];
        return $this->_contenido->save($data);
    }
    public function delete(Request $req)
    {
        $req['modificado']=date("Y-m-d H:i:s.u");
        return $this->_curso->eliminarCurso($req->input('idcurso'),$req['modificado']);
    }
    public function getCursos(){
        return response()->json([
            'data'=>$this->_curso->getAll(),

        ]);
    }
    public function getVerMiCurso(Request $req)
    {
        return response()->json([
            'data'=>$this->_curso->getId($req->input('idcurso')),
            'contenido'=>$this->_contenido->getContenido($req->input('idcurso')),
        ]);
    }
    public function getVerLeccion(Request $req)
    {
        return response()->json([
            'contenido'=>$this->_contenido->getContenidoLeccion($req->input('idcurso'),$req->input('idcont')),
        ]);
    }

}