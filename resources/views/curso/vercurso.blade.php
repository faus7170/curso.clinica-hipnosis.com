@extends('layouts.app')

@section('content')
<input id="idcurso" value="{{$idcurso}}" style="display: none"/>
<div id="vercurso"></div>
<script src="{{asset('js/app.js')}}"></script>
@endsection
