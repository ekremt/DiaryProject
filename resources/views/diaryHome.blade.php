@extends('layouts.app')
@section('title')
    @if(!isset(Auth::user()->email))
        <script>window.location='/dLogin';</script>

    @else
    <title>Home | Diary</title>
@endsection
@section('locale')
    <select class="custom-select-sm col-1 custom-select rounded-pill shadow-main" id="locale-selector"></select>
@endsection
@section('content')


        <div tabindex="-1" class="container w-75 h-50" id='top'>

            <div class='left' hidden>

                <div id='theme-system-selector' class='selector'>
                    Theme System:

                    <select hidden>
                        <option value='bootstrap' selected></option>
                    </select>
                </div>

                <div data-theme-system="bootstrap" class='selector' style='display:none'>
                    Theme Name:

                    <select hidden>

                        <option selected  value='journal'>Journal</option>

                    </select>
                </div>

                <span id='loading' style='display:none'>loading theme...</span>

            </div>



            <div class='clear'></div>


            <div  id='calendar'></div>
        </div>
        @if($message=Session::get('success'))
            <div id="notificationAlert" class="alert-size notification alert alert-success alert-block col-3 rounded-pill btn-sm">
                <button id="notificationHide" class="close alert-size"  type="button">
                    x
                </button>
                <strong>{{$message}}</strong>
            </div>
        @endif
        <div class="modal fade" id="ModalAdd" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" >
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <form id="addEventForm" class="form-horizontal" method="POST" action="{{route('addEventPost')}}">

                        <input type="hidden" id="_token" name="_token" value="{{ csrf_token() }}">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Event title</h5>
                        <button type="button" class="close btn-sm" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body  ">
                        <div class="form-group">
                            <div class="form-group btn-group-sm mt-5 col-lg-10 offset-lg-1 ">
                                <label id="saveTitle-label"  class="btn-sm scroll-home-label" for="saveTitle">{{ __('Event Title:') }}</label>
                                <input id="saveTitle" data-bvalidator="required" type="text" class="form-control btn-sm  border-light shadow-main rounded-pill @error('saveTitle') is-invalid @enderror "  value="{{ old('saveTitle') }}"   autocomplete="off"   placeholder="Event Title"  name="saveTitle"  >
                                @error('saveTitle')
                                <span  id="saveTitle-alert" class="title-alert invalid-feedback alert-size pl-3 ml-2 rounded-pill alert-danger col-10 " role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>

                                @enderror

                            </div>
                        </div>


                        <div class="form-group btn-group-sm mt-5 col-lg-10 offset-lg-1 ">
                            <label id="saveColor-label"  class="btn-sm scroll-home-label" for="saveColor">{{ __('Color:') }}</label>
                             <select value="{{ old('saveColor') }}"   autocomplete="off" data-bvalidator="required"  placeholder="Color"   name="saveColor" class="form-control btn-sm h-50  form-control btn-sm  border-light shadow-main rounded-pill @error('saveColor') is-invalid @enderror " id="saveColor">
                                <option value="">Choose</option>
                                <option style="color:#0071c5;" value="#0071c5">&#9724; Vize</option>
                                <option style="color:#40E0D0;" value="#40E0D0">&#9724; Büyük İş</option>
                                <option style="color:#008000;" value="#008000">&#9724; Küçük İş</option>


                            </select>

                            @error('saveColor')
                            <span  id="saveColor-alert" class="saveColor-alert invalid-feedback alert-size pl-3 ml-2 rounded-pill alert-danger col-10 " role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>

                            @enderror

                        </div>


                        <div class="form-group">
                            <div class="form-group btn-group-sm mt-5 col-lg-10 offset-lg-1 ">
                                <label id="saveStart-label"  class="btn-sm scroll-home-label" for="saveStart">{{ __('Start date:') }}</label>
                                <input  id="saveStart" data-bvalidator="required" type="text" class="form-control btn-sm  border-light shadow-main rounded-pill @error('saveStart') is-invalid @enderror "  value="{{ old('saveStart') }}"   autocomplete="off"   placeholder="Start date"  name="saveStart"  >
                                @error('saveStart')
                                <span  id="saveStart-alert" class="saveStart-alert invalid-feedback alert-size pl-3 ml-2 rounded-pill alert-danger col-10 " role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>

                                @enderror

                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-group btn-group-sm mt-5 col-lg-10 offset-lg-1 ">
                                <label id="saveEnd-label"  class="btn-sm scroll-home-label" for="saveEnd">{{ __('End date:') }}</label>
                                <input  id="saveEnd" data-bvalidator="required" type="text" class="form-control btn-sm  border-light shadow-main rounded-pill @error('saveEnd') is-invalid @enderror "  value="{{ old('saveEnd') }}"   autocomplete="off"   placeholder="End date"  name="saveEnd"  >
                                @error('saveEnd')
                                <span  id="saveEnd-alert" class="saveEnd-alert invalid-feedback alert-size pl-3 ml-2 rounded-pill alert-danger col-10 " role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>

                                @enderror

                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn  btn btn-danger btn-sm" data-dismiss="modal">Close</button>
                        <button type="submit" id="addEventSubmit" class="btn btn-success btn-sm">Save changes</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="modal fade" id="ModalEdit" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" >
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Diary Edit</h5>
                        <button type="button" class="close btn-sm" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body  ">
                        <div class="form-group">
                            <div class="form-group btn-group-sm mt-5 col-lg-10 offset-lg-1 ">
                                <label id="editTitle-label"  class="btn-sm scroll-home-label" for="editTitle">{{ __('Edit Title:') }}</label>
                                <input id="editTitle" data-bvalidator="required" type="text" class="form-control btn-sm  border-light shadow-main rounded-pill @error('editTitle') is-invalid @enderror "  value="{{ old('editTitle') }}"   autocomplete="off"   placeholder="Edit Title"  name="editTitle"  >
                                @error('editTitle')
                                <span  id="editTitle-alert" class="editTitle-alert invalid-feedback alert-size pl-3 ml-2 rounded-pill alert-danger col-10 " role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>

                                @enderror

                            </div>
                        </div>


                        <div class="form-group btn-group-sm mt-5 col-lg-10 offset-lg-1 ">
                            <label id="editColor-label"  class="btn-sm scroll-home-label" for="editColor">{{ __('Color:') }}</label>
                            <select value="{{ old('editColor') }}"   autocomplete="off" data-bvalidator="required"  placeholder="Edit Color"   name="editColor" class="form-control btn-sm h-50  form-control btn-sm  border-light shadow-main rounded-pill @error('color') is-invalid @enderror " id="editColor">
                                <option value="">Choose</option>
                                <option style="color:#0071c5;" value="#0071c5">&#9724; Vize</option>
                                <option style="color:#40E0D0;" value="#40E0D0">&#9724; Büyük İş</option>
                                <option style="color:#008000;" value="#008000">&#9724; Küçük İş</option>

                            </select>

                            @error('editColor')
                            <span  id="editColor-alert" class="color-alert invalid-feedback alert-size pl-3 ml-2 rounded-pill alert-danger col-10 " role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>

                            @enderror

                        </div>


                        <div class="form-group">
                            <div class="form-group btn-group-sm mt-5 col-lg-10 offset-lg-1 ">
                                <label id="editStart-label"  class="btn-sm scroll-home-label" for="editStart">{{ __('Start date:') }}</label>
                                <input readonly id="editStart" data-bvalidator="required" type="text" class="form-control btn-sm  border-light shadow-main rounded-pill @error('editStart') is-invalid @enderror "  value="{{ old('editStart') }}"   autocomplete="off"   placeholder="Start date"  name="editStart"  >
                                @error('editStart')
                                <span  id="editStart-alert" class="editStart-alert invalid-feedback alert-size pl-3 ml-2 rounded-pill alert-danger col-10 " role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>

                                @enderror

                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-group btn-group-sm mt-5 col-lg-10 offset-lg-1 ">
                                <label id="editEnd-label"  class="btn-sm scroll-home-label" for="editEnd">{{ __('End date:') }}</label>
                                <input readonly id="end" data-bvalidator="required" type="text" class="form-control btn-sm  border-light shadow-main rounded-pill @error('editEnd') is-invalid @enderror "  value="{{ old('editEnd') }}"   autocomplete="off"   placeholder="End date"  name="editEnd"  >
                                @error('editEnd')
                                <span  id="editEnd-alert" class="editEnd-alert invalid-feedback alert-size pl-3 ml-2 rounded-pill alert-danger col-10 " role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>

                                @enderror

                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success  btn-sm">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    @endif
@endsection
@section('css')
    <link href='/components/diaryHome/css/main.css' rel='stylesheet' />
    <link href='/components/fullcalendar/packages/core/main.css' rel='stylesheet' />
    <link href='/components/fullcalendar/packages/bootstrap/main.css' rel='stylesheet' />
    <link href='/components/fullcalendar/packages/timegrid/main.css' rel='stylesheet' />
    <link href='/components/fullcalendar/packages/daygrid/main.css' rel='stylesheet' />
    <link href='/components/fullcalendar/packages/list/main.css' rel='stylesheet' />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.contextMenu.min.css">
    <style>


    </style>
@endsection
@section('script')
    <script src='/components/diaryHome/js/main.js'></script>
    <script src='/components/fullcalendar/packages/core/main.js'></script>
    <script src='/components/fullcalendar/packages/interaction/main.js'></script>
    <script src='/components/fullcalendar/packages/bootstrap/main.js'></script>
    <script src='/components/fullcalendar/packages/daygrid/main.js'></script>
    <script src='/components/fullcalendar/packages/timegrid/main.js'></script>
    <script src='/components/fullcalendar/packages/list/main.js'></script>
    <script src='/components/fullcalendar/js/theme-chooser.js'></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.js'></script>
    <script src='/components/fullcalendar/packages/core/locales-all.js'></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.contextMenu.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/5.3.2/bootbox.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU=" crossorigin="anonymous"></script>

    <script>

        var calendar;
        document.addEventListener('DOMContentLoaded', function() {
            var calendarEl = document.getElementById('calendar');

            var initialLocaleCode = 'en';
            var localeSelectorEl = document.getElementById('locale-selector');

            initThemeChooser({

                init: function(themeSystem) {
                    calendar = new FullCalendar.Calendar(calendarEl, {
                        plugins: [ 'bootstrap', 'interaction', 'dayGrid', 'timeGrid', 'list' ],
                        themeSystem: themeSystem,

                        header: {
                            left: 'prevYear,prev,next,nextYear today custom',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
                        },
                        defaultDate: '2019-11-12',
                        weekNumbers: true,
                        navLinks: true, // can click day/week names to navigate views
                        editable: true,
                        eventLimit: true, // allow "more" link when too many events
                        eventClassName:'context-menu-one',
                        selectable: true,
                        selectMirror: true,
                        selectHelper:true,
                        select: function(event) {


                            $('#ModalAdd #saveStart').val(moment(event.start).format('YYYY-MM-DD HH:mm:ss'));
                            $('#ModalAdd #saveEnd').val(moment(event.end).format('YYYY-MM-DD HH:mm:ss'));
                            $('#ModalAdd').modal('show');
                        },

                      events: '/dHome/getEvent' ,


                    });
                    calendar.render();
                    // build the locale selector's options
                    calendar.getAvailableLocaleCodes().forEach(function(localeCode) {
                        var optionEl = document.createElement('option');
                        optionEl.value = localeCode;
                        optionEl.selected = localeCode == initialLocaleCode;
                        optionEl.innerText = localeCode;
                        localeSelectorEl.appendChild(optionEl);
                    });

                    // when the selected option changes, dynamically change the calendar option
                    localeSelectorEl.addEventListener('change', function() {
                        if (this.value) {
                            calendar.setOption('locale', this.value);
                        }
                    });
                },


                change: function(themeSystem) {
                    calendar.setOption('themeSystem', themeSystem);
                }

            });

        });
        $(document).ready(function () {




            $.contextMenu({
                selector: '.context-menu-one',
                callback: function(key, options) {
                    var locale = $('#locale-selector').val();
                    var event = $(this);
                    var deleteid = $(this).id;
                    switch (key) {
                        case 'edit':
                            $('#ModalEdit #start').val(moment(start).format('YYYY-MM-DD HH:mm:ss'));
                            $('#ModalEdit #end').val(moment(end).format('YYYY-MM-DD HH:mm:ss'));
                            $('#ModalEdit').modal('show');
                            break;
                        case 'delete':
                            $.ajax({
                                type: 'POST',
                                url: '/dHome/dropEvent',
                                data: {
                                    id:deleteid

                                },
                                beforeSend: function(data) {
                                     bootbox.confirm({
                                        message: "Is event delete?",
                                        size: 'small',
                                        locale:  locale,
                                        buttons: {
                                            confirm: {
                                                label: 'Yes',
                                                className: 'btn-success'
                                            },
                                            cancel: {
                                                label: 'No',
                                                className: 'btn-danger'
                                            }
                                        },
                                        callback: function (result) {
                                            return result;
                                        }
                                    }

                                    );

                                },
                                success:function(data){
                                    alert('asd');
                                    event.remove();
                                }
                            });


                            break;

                    }
                },
                items: {
                    "edit": {name: "Edit", icon: "edit"},
                    "delete": {name: "Delete", icon: "delete"},


                }
            });

            $('.context-menu-one').on('click', function(e){
                console.log('clicked', this);
            })


        });


    </script>
@endsection
