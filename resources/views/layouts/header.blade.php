<nav class="navbar navbar-expand-md navbar-light bg-white @yield('shadow') rounded-lg">
    <div id="nav-container" class="container">
        <a class="navbar-brand" href="{{ url('dHome') }}">
            <img width="100db" src="/components/img/diaryLogo.png" alt="logo">
        </a>
        @yield('pageTitle')
        @yield('localeUser')
        @if (isset(Auth::user()->email))
             @yield('locale')
            <button  class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                <span class="navbar-toggler-icon"></span>
            </button>

        @endif

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <!-- Left Side Of Navbar -->


            <ul class="navbar-nav mr-auto">

            </ul>
            <div id="dropdown-main" class="dropdown-main   border-0 ">
                <!-- Right Side Of Navbar -->
                <ul id="dropdown-main-ul" class="navbar-nav ml-auto ">
                    <!-- Authentication Links -->
                    @guest

                        @if (!isset(Auth::user()->email))

                        @endif
                    @else
                        <li @yield('layoutDiv') id="dropdown" class="nav-item dropdown ">
                            <a id="navbarDropdown" class="nav-link dropdown-toggle btn-block btn-sm ml-1 border-top-0 " href="#" role="button"  aria-haspopup="true" aria-expanded="false" v-pre>
                                {{ Auth::user()->name }} <span class="caret"></span>
                            </a>

                            <div id="logout-div" style="z-index: 2 !important;position: absolute;left:0%;right: 50%;"   class="dropdown-menu dropdown-menu-right rounded-lg  shadow-main pl-3 pr-3 mt-3" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item btn-sm list-group-item-success rounded-pill " href="{{ route('userProfileGet') }}">Profile</a>
                                <a class="dropdown-item btn-sm list-group-item-dark rounded-pill" href="{{route('passwordResetGet')}}">Password Reset</a>
                                <a id="workplaceButton" class="dropdown-item btn-sm list-group-item-info rounded-pill" href="#">Workplace Settings</a>
                                <a class="dropdown-item btn-sm list-group-item-danger rounded-pill" href="{{ route('homeLogout') }}">Logout</a>


                            </div>


                        </li>
                    @endguest
                </ul></div>
        </div>
    </div>
</nav>





