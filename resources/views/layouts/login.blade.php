<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <!-- Required meta tags -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>{{ config('app.name', 'Cursos') }}</title>
    <!-- plugins:css -->
    <link rel="stylesheet" href="{{ asset(config('app.template','').'/vendors/feather/feather.css') }}">
    <link rel="stylesheet" href="{{ asset(config('app.template','').'/vendors/ti-icons/css/themify-icons.css') }}">
    <link rel="stylesheet" href="{{ asset(config('app.template','').'/vendors/css/vendor.bundle.base.css') }}">
    <!-- endinject -->
    <!-- Plugin css for this page -->
    <link rel="stylesheet" href="{{ asset(config('app.template','').'/vendors/datatables.net-bs4/dataTables.bootstrap4.css') }}">
    <link rel="stylesheet" href="{{ asset(config('app.template','').'/vendors/ti-icons/css/themify-icons.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset(config('app.template','').'/js/select.dataTables.min.css') }}">
    <!-- End plugin css for this page -->
    <!-- inject:css -->
    <link rel="stylesheet" href="{{ asset(config('app.template','').'/css/vertical-layout-light/style.css') }}">
    <!-- endinject -->
    <link rel="shortcut icon" href="{{ asset(config('app.template','').'/images/favicon.png') }}" />
</head>
<body>
<div class="container-scroller">
<!-- partial Conten -->
<div class="main-panel-login">
    <div class="content-wrapper">
        <div class="row">
            <div class="col-md-12 grid-margin">
                <div class="row">
                    @yield('content')
                    <!-- <div class="col-12 col-xl-8 mb-4 mb-xl-0">
                       <h3 class="font-weight-bold">Welcome Aamir</h3>
                       <h6 class="font-weight-normal mb-0">All systems are running smoothly! You have <span class="text-primary">3 unread alerts!</span></h6>
                     </div>
                     <div class="col-12 col-xl-4">
                      <div class="justify-content-end d-flex">
                       <div class="dropdown flex-md-grow-1 flex-xl-grow-0">
                         <button class="btn btn-sm btn-light bg-white dropdown-toggle" type="button" id="dropdownMenuDate2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                          <i class="mdi mdi-calendar"></i> Today (10 Jan 2021)
                         </button>
                         <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuDate2">
                           <a class="dropdown-item" href="#">January - March</a>
                           <a class="dropdown-item" href="#">March - June</a>
                           <a class="dropdown-item" href="#">June - August</a>
                           <a class="dropdown-item" href="#">August - November</a>
                         </div>
                       </div>
                      </div>
                     </div>!-->
                </div>
            </div>
        </div>
    </div>
    <!-- content-wrapper ends -->
    <!-- partial:partials/_footer.html -->
    <footer class="footer">
        <div class="d-sm-flex justify-content-center justify-content-sm-between">
            <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2021.  Premium <a href="https://www.bootstrapdash.com/" target="_blank">Bootstrap admin template</a> from BootstrapDash. All rights reserved.</span>
            <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted & made with <i class="ti-heart text-danger ml-1"></i></span>
        </div>
        <div class="d-sm-flex justify-content-center justify-content-sm-between">
            <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">Distributed by <a href="https://www.themewagon.com/" target="_blank">Themewagon</a></span>
        </div>
    </footer>
    <!-- partial -->
</div>
<!-- main-panel ends -->
</div>
<!-- container-scroller -->

<!-- plugins:js -->
<script src="{{ asset(config('app.template','').'/vendors/js/vendor.bundle.base.js') }}"></script>
<!-- endinject -->
<!-- Plugin js for this page -->
<script src="{{ asset(config('app.template','').'/vendors/chart.js/Chart.min.js') }}"></script>
<script src="{{ asset(config('app.template','').'/vendors/datatables.net/jquery.dataTables.js') }}"></script>
<script src="{{ asset(config('app.template','').'/vendors/datatables.net-bs4/dataTables.bootstrap4.js') }}"></script>
<script src="{{ asset(config('app.template','').'/js/dataTables.select.min.js') }}"></script>

<!-- End plugin js for this page -->
<!-- inject:js -->
<script src="{{ asset(config('app.template','').'/js/off-canvas.js') }}"></script>
<script src="{{ asset(config('app.template','').'/js/hoverable-collapse.js') }}"></script>
<script src="{{ asset(config('app.template','').'/js/template.js') }}"></script>
<script src="{{ asset(config('app.template','').'/js/settings.js') }}"></script>
<script src="{{ asset(config('app.template','').'/js/todolist.js') }}"></script>
<!-- endinject -->
<!-- Custom js for this page-->
<script src="{{ asset(config('app.template','').'/js/dashboard.js') }}"></script>
<script src="{{ asset(config('app.template','').'/js/Chart.roundedBarCharts.js') }}"></script>
<!-- End custom js for this page-->
</body>
</html>