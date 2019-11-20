<nav class="navbar navbar-expand-md navbar-light bg-white @yield('shadow') rounded-pill">
    <div class="container">
        <a class="navbar-brand" href="{{ url('dHome') }}">
            <img width="100db" src="/components/img/diaryLogo.png" alt="logo">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <!-- Left Side Of Navbar -->
            <ul class="navbar-nav mr-auto">

            </ul>

            <!-- Right Side Of Navbar -->
            <ul class="navbar-nav ml-auto">
                <!-- Authentication Links -->
                @guest

                    @if (!isset(Auth::user()->email))
                        @yield('register-link')
                        @yield('login-link')
                    @endif
                @else
                    <li id="dropdown" class="nav-item dropdown ">
                        <a id="navbarDropdown" class="nav-link dropdown-toggle btn-block btn-sm rounded-pill border-top-0 " href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                            {{ Auth::user()->name }} <span class="caret"></span>
                        </a>

                        <div id="logout-div"   class="dropdown-menu dropdown-menu-right rounded-pill shadow-lg pl-3 pr-3 mt-4" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item btn-sm list-group-item-danger rounded-pill" href="{{ route('homeLogout') }}">Logout</a>
                            <a class="dropdown-item btn-sm list-group-item-success rounded-pill" href="#">Profile</a>

                        </div>

                    </li>
                @endguest
            </ul>
        </div>
    </div>
</nav>
@section('script')
    <script>

        $('#dropdown').toggleMenu(function () {

            $('#logout-div').show('slow');
        });

    </script>
    @endsection

