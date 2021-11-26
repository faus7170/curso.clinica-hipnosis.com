<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Clinica Hipnosis') }}</title>

    <script charset="utf-8" src="//cdn.iframe.ly/embed.js?api_key={e4da0356fd26264a45b6a1}&iframe=1&omit_script=1"></script>-
    <!--<script src="//cdn.iframe.ly/embed.js" async></script>-->
    <!-- Font Awesome -->
    <link rel="stylesheet" href="{{ asset('plugins/fontawesome-free/css/all.min.css')}}">
    <!-- Ionicons -->
    <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <!-- Tempusdominus Bbootstrap 4 -->
    <link rel="stylesheet" href="{{ asset('plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css')}}">
    <!-- iCheck -->
    <link rel="stylesheet" href="{{ asset('plugins/icheck-bootstrap/icheck-bootstrap.min.css')}}">
    <!-- JQVMap
    <link rel="stylesheet" href="{{ asset('plugins/jqvmap/jqvmap.min.css')}}">-->
    <!-- Theme style -->
    <link rel="stylesheet" href="{{ asset('dist/css/adminlte.min.css')}}">
    <!-- overlayScrollbars -->
    <link rel="stylesheet" href="{{ asset('plugins/overlayScrollbars/css/OverlayScrollbars.min.css')}}">
    <!-- Daterange picker -->
    <link rel="stylesheet" href="{{ asset('plugins/daterangepicker/daterangepicker.css')}}">
    <!-- summernote -->
    <link rel="stylesheet" href="{{ asset('plugins/summernote/summernote-bs4.css')}}">
    <!-- Google Font: Source Sans Pro -->
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <!-- Scripts -->
    @if(auth()->user())
    <script>
        window.user = {
            id: {{ auth()->id() }},
            name: "{{ auth()->user()->name }}",
            canal: "{{Auth::user()->canal}}",
        @if(Auth::user()->hasRole('admin'))
            rol: 1
        @else
            rol: 0
        @endif
        };

        window.csrfToken = "{{ csrf_token() }}";
    </script>
    @endif



    <!-- Google Font: Source Sans Pro -->
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">

    <script src="https://ckeditor.com/apps/ckfinder/3.5.0/ckfinder.js"></script>
</head>
<body class="hold-transition sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed">
<div class="wrapper">
<!-- Navbar -->
<nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
            </li>
    </ul>
    <!-- SEARCH FORM -->
    <form class="form-inline ml-3">
        <div class="input-group input-group-sm">
            <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">
            <div class="input-group-append">
                <button class="btn btn-navbar" type="submit">
                    <i class="fas fa-search"></i>
                </button>
            </div>
        </div>
    </form>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown show">
          @if (Route::has('login'))
          <div class="top-right links">
              @auth
                      <a class="nav-link" data-toggle="dropdown" href="#" aria-expanded="true">
                          <i class="far fa-user"></i>
                          {{ Auth::user()->name  }}
                      </a>
                  @else
                      <a href="{{ route('login') }}" class="nav-link" >
                          <i class="far fa-user"></i>
                          Ingresar
                      </a>
                     <!--<a href="{{ route('login') }}">Ingresar</a>-->

              @endauth
          </div>
          @endif
        </li>
        @if (Route::has('login'))
            @auth
            @else
                @if (Route::has('register'))
                    <li class="nav-item dropdown show">
                        <a href="{{ route('register') }}" class="nav-link" >
                            <i class="fa fa-stream"></i>
                            Registrar
                        </a>
                    </li>
                @endif
            @endauth
        @endif

        @if (Route::has('login'))
        @auth
        <li class="nav-item dropdown show">
                <a class="nav-link" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();" data-toggle="dropdown"  aria-expanded="true">
                    <i class="fa fa-power-off"></i>
                    {{ __('Salir') }}
            </a>

            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                @csrf
            </form>
        </li>
        @endauth
        @endif
    </ul>
</nav>
<!-- /.navbar -->

<!-- Main Sidebar Container -->
<aside class="main-sidebar sidebar-dark-primary elevation-4">
<!-- Brand Logo -->
<a href="https://www.futbolsemillero.com/" class="brand-link">
    <img src="{{ asset('dist/img/AdminLTELogo.png')}}" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
         style="opacity: .8">
    <span class="brand-text font-weight-light">Terapia Online</span>
</a>

<!-- Sidebar -->
<div class="sidebar">
<!-- Sidebar user panel (optional) -->
<div class="user-panel mt-3 pb-3 mb-3 d-flex">
    <div class="image">
        <img src="{{ asset('dist/img/user2-160x160.jpg')}}" class="img-circle elevation-2" alt="User Image">
    </div>
    <div class="info">
        <a href="{{url('home')}}" class="d-block">
            @auth
            @if (Auth::user()->hasRole('admin'))
                Dr.
            @else
                Pac.
            @endif
            @if (Route::has('login'))

            {{ Auth::user()->name}}
            @endif
            @endauth
        </a>
    </div>
</div>

<!-- Sidebar Menu -->
<nav class="mt-2">
<ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
<!-- Add icons to the links using the .nav-icon class
     with font-awesome or any other icon font library -->
    @auth
    <li class="nav-item">
    <a href="{{url('curso/miscursos')}}" class="nav-link">
        <i class="far fa-circle nav-icon"></i>
        <p>Consultorios</p>
    </a>
</li>
    @if(Auth::check())
    @if (Auth::user()->hasRole('admin'))
    <li class="nav-header">Administración</li>
    <li class="nav-item">
        <a href="{{url('curso/create')}}" class="nav-link">
            <i class="far fa-circle nav-icon"></i>
            <p>Crear Consultorio</p>
        </a>
    </li>
    @endif
    @endif
   <!-- <li class="nav-item">
        <a href="{{url('curso/create')}}" class="nav-link">
            <i class="far fa-circle nav-icon"></i>
            <p>Lecciones</p>
        </a>
    </li>-->
    @endauth
</ul>
</nav>
<!-- /.sidebar-menu -->
</div>
<!-- /.sidebar -->
</aside>

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
<!-- Main content -->
<section class="content">
<div class="container-fluid">
    @yield('content')
<!-- /.row -->
</div><!--/. container-fluid -->
</section>


<!-- /.content -->
</div>
<!-- /.content-wrapper -->

<!-- Control Sidebar -->
<aside class="control-sidebar control-sidebar-dark">
    <!-- Control sidebar content goes here -->
    asdad
</aside>
<!-- /.control-sidebar -->

    <!-- Main Footer -->
    <footer class="main-footer">
        <strong>Copyright &copy; 2020<a href="http://adminlte.io">EL SEMILLERO DE LIGA</a>.</strong>
        Todos los derechos reservados.
        <div class="float-right d-none d-sm-inline-block">
            <b>Version</b> 0.0.1
        </div>
    </footer>
</div>
<!-- ./wrapper -->

<!-- REQUIRED SCRIPTS -->
<!-- PAGE PLUGINS -->
<!-- jQuery -->
<script src="{{ asset('plugins/jquery/jquery.min.js')}}"></script>
<!-- jQuery UI 1.11.4 -->
<script src="{{ asset('plugins/jquery-ui/jquery-ui.min.js')}}"></script>
<!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
<script>
    $.widget.bridge('uibutton', $.ui.button)
</script>
<!-- Bootstrap 4 -->
<script src="{{ asset('plugins/bootstrap/js/bootstrap.bundle.min.js')}}"></script>
<!-- ChartJS -->
<script src="{{ asset('plugins/chart.js/Chart.min.js')}}"></script>
<!-- Sparkline -->
<script src="{{ asset('plugins/sparklines/sparkline.js')}}"></script>
<!-- JQVMap
<script src="{{ asset('plugins/jqvmap/jquery.vmap.min.js')}}"></script>
<script src="{{ asset('plugins/jqvmap/maps/jquery.vmap.usa.js')}}"></script>-->
<!-- jQuery Knob Chart -->
<script src="{{ asset('plugins/jquery-knob/jquery.knob.min.js')}}"></script>
<!-- daterangepicker -->
<script src="{{ asset('plugins/moment/moment.min.js')}}"></script>
<script src="{{ asset('plugins/daterangepicker/daterangepicker.js')}}"></script>
<!-- Tempusdominus Bootstrap 4 -->
<script src="{{ asset('plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js')}}"></script>
<!-- Summernote -->
<script src="{{ asset('plugins/summernote/summernote-bs4.min.js')}}"></script>
<!-- overlayScrollbars -->
<script src="{{ asset('plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js')}}"></script>
<!-- AdminLTE App -->
<script src="{{ asset('dist/js/adminlte.js')}}"></script>
<!-- AdminLTE dashboard demo (This is only for demo purposes) -->
<script src="{{ asset('dist/js/pages/
.js')}}"></script>
<!-- AdminLTE for demo purposes -->
<script src="{{ asset('dist/js/demo.js')}}"></script>
</body>
<footer>

</footer>
</html>
