<?php
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CursoController;
use App\Http\Controllers\cursousuarioController;

Route::get('/', function () {
    return view('welcome');
});
Route::group(['middleware' => ['auth']], function() {
    Route::resource('roles', RoleController::class);
    Route::resource('users', UserController::class);

});

Auth::routes();
Route::get('/home', [HomeController::class, 'index'])->name('home');

Route::get('/curso',[cursoController::class, 'index'] )->name('principal');

Route::get('/getDatos',[HomeController::class, 'getDatos'] )->name('getDatos');
Route::get('/curso/create',[cursoController::class, 'create'] )->name('create');
Route::get('/curso/miscursos',[cursoController::class, 'miscursos'] )->name('misCursos');
Route::post('/curso/save',[cursoController::class, 'save'] )->name('Guardar Curso');
Route::post('/curso/delete',[cursoController::class, 'delete'] )->name('Eliminar Curso');
Route::post('/curso/registrarCurso',[cursoController::class, 'registrarCurso'] )->name('Registrar Curso');
Route::post('/curso/saveLeccion',[cursoController::class, 'saveLeccion'] )->name('Guardar Leccion');
Route::get('/curso/getCursos',[cursoController::class, 'getCursos'] )->name('Listar cursos');
Route::get('/curso/getVerMiCurso',[cursoController::class, 'getVerMiCurso'] )->name('ver mi cursos');
Route::get('/curso/vercurso',[cursoController::class, 'verCurso'] )->name('Ver cursos');
Route::get('/curso/videochat',[cursoController::class, 'videochat'] )->name('Video Chat');
/**Manejo de leccciones
 */
Route::get('/curso/leccion',[cursoController::class, 'leccion'] )->name('Ver leccion');
Route::get('/curso/getVerLeccion',[cursoController::class, 'getVerLeccion'] )->name('Extraer Leccion');
Route::get('/cursousuario/getmisCursos',[cursousuarioController::class, 'getmisCursos'] )->name('misCursos');

/*
Route::any('/ckfinder/connector', '\CKSource\CKFinderBridge\Controller\CKFinderController@requestAction')
    ->name('ckfinder_connector');
Route::get('/cursousuario/getmisCursos',[cursoController::class, 'getmisCursos'] )->name('misCursos');

Route::any('/ckfinder/browser', '\CKSource\CKFinderBridge\Controller\CKFinderController@browserAction')
    ->name('ckfinder_browser');
Route::any('/ckfinder/examples/{example?}', '\CKSource\CKFinderBridge\Controller\CKFinderController@examplesAction')
    ->name('ckfinder_examples');*/



