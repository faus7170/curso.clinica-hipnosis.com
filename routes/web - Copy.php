<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', function () {
    return view('home');
    Route::resource('/home','HomeController@index');
});

Auth::routes();
Route::group(['middleware' => ['auth']], function() {
    Route::resource('roles','RoleController');
    Route::resource('users','UserController');
});

Route::get('/home', 'HomeController@index')->name('home');
Route::post('/auth', 'HomeController@authenticate');


Route::get('/getDatos', 'HomeController@getDatos')->name('getDatos');
Route::get('/curso/create', 'cursoController@create')->name('nuevoCurso');
Route::get('/curso/miscursos', 'cursoController@miscursos')->name('misCursos');
Route::post('/curso/save', 'cursoController@save')->name('Guardar Curso');
Route::post('/curso/delete', 'cursoController@delete')->name('Eliminar Curso');
Route::post('/curso/registrarCurso', 'cursoController@registrarCurso')->name('Registrar Curso');

Route::post('/curso/saveLeccion', 'cursoController@saveLeccion')->name('Guardar Leccion');
Route::get('/curso/getCursos', 'cursoController@getCursos')->name('Listar cursos');
Route::get('/curso/getVerMiCurso', 'cursoController@getVerMiCurso')->name('ver mi cursos');

Route::get('/curso/vercurso', 'cursoController@verCurso')->name('Ver cursos');
Route::get('/curso/videochat', 'cursoController@videochat')->name('Video Chat');
/**Manejo de leccciones
 */
Route::get('/curso/leccion', 'cursoController@leccion')->name('Ver leccion');
Route::get('/curso/getVerLeccion', 'cursoController@getVerLeccion')->name('extraer leccion');
Route::get('/cursousuario/getmisCursos', 'cursousuarioController@getmisCursos')->name('misCursos');

Route::any('/ckfinder/connector', '\CKSource\CKFinderBridge\Controller\CKFinderController@requestAction')
    ->name('ckfinder_connector');
Route::any('/ckfinder/browser', '\CKSource\CKFinderBridge\Controller\CKFinderController@browserAction')
    ->name('ckfinder_browser');
Route::any('/ckfinder/examples/{example?}', '\CKSource\CKFinderBridge\Controller\CKFinderController@examplesAction')
    ->name('ckfinder_examples');

