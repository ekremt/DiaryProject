var bridgesSelector =$('#bridges-selector');
$(document).ready(function () {
//Home Main


                //Form'u odaklamak için tıklanan inputlara göre diğer tarafların flu olmasını sağlar.
// Form Odaklanma Start

                var passwordAlert = $('#password-alert');
                var emailAlert = $('#email-alert');
                $('input,#password-show').focus(function () {

                    $("nav").css("-webkit-filter", "blur(5px)");
                    $("#image").css("-webkit-filter", "blur(4px)");
                    $("#top").css("-webkit-filter", "blur(5px)");
                    $("form").css("-webkit-filter", "blur(0px)");
                    passwordAlert.hide();
                    emailAlert.hide();

                }).blur(function () {

                    $("nav").css("-webkit-filter", "blur(0px)");
                    $("#image").css("-webkit-filter", "blur(0px)");
                    $("form").css("-webkit-filter", "blur(0px)");
                    $("#top").css("-webkit-filter", "blur(0px)");
                });

// Form Odaklanma End

// Label Kayan Animasyonu
// Label Start

                var maintenanceAddSelectFB = $('#maintenanceAddSelect');
                var maintenanceAddSelectLabel = $('#maintenanceAddSelect-label');
                maintenanceAddSelectFB.focus(function()
                {
                    maintenanceAddSelectLabel.show().animate({top: '-30px'});
                }).blur(function () {
                    maintenanceAddSelectLabel.animate({top: '0px'}).hide();
                });
// Add Modal İn
                var licensePlate = $('#licensePlate');
                var licensePlateLabel = $('#licensePlate-label');
                 licensePlate.focus(function()
                {
                    licensePlateLabel.show().animate({top: '-25px'});
                  }).blur(function () {
                     licensePlateLabel.animate({top: '0px'}).hide();
                 });



                var fullName = $('#fullName');
                var fullNameLabel = $('#fullName-label');
                 fullName.focus(function()
                {
                    fullNameLabel.show().animate({top: '-25px'});
                }).blur(function () {
                fullNameLabel.animate({top: '0px'}).hide();
                });

                var email = $('#email');
                var emailLabel = $('#email-label');
                 email.focus(function()
                {
                    emailLabel.show().animate({top: '-25px'});
                }).blur(function () {
                 emailLabel.animate({top: '0px'}).hide();
                });

                var gsm = $('#gsm');
                var gsmLabel = $('#gsm-label');
                gsm.focus(function()
                {
                    gsmLabel.show().animate({top: '-25px'});
                }).blur(function () {
                    gsmLabel.animate({top: '0px'}).hide();
                });

                var country = $('#country');
                var countryLabel = $('#country-label');
                country.focus(function()
                {
                    countryLabel.show().animate({top: '-25px'});
                }).blur(function () {
                    countryLabel.animate({top: '0px'}).hide();
                });

                var lang = $('#lang');
                var langLabel = $('#lang-label');
                lang.focus(function()
                {
                    langLabel.show().animate({top: '-25px'});
                }).blur(function () {
                    langLabel.animate({top: '0px'}).hide();
                });

//Edit Modal İn
                var licensePlateEdit = $('#licensePlateEdit');
                var licensePlateEditLabel = $('#licensePlateEdit-label');
                 licensePlateEdit.focus(function()
                {
                    licensePlateEditLabel.show().animate({top: '-25px'});
                }).blur(function () {
                     licensePlateEditLabel.animate({top: '0px'}).hide();
                });

                var fullNameEdit = $('#fullNameEdit');
                var fullNameEditLabel = $('#fullNameEdit-label');
                fullNameEdit.focus(function()
                {
                    fullNameEditLabel.show().animate({top: '-25px'});
                }).blur(function () {
                    fullNameEditLabel.animate({top: '0px'}).hide();
                });

                var emailEdit = $('#emailEdit');
                var emailEditLabel = $('#emailEdit-label');
                emailEdit.focus(function()
                {
                    emailEditLabel.show().animate({top: '-25px'});
                }).blur(function () {
                    emailEditLabel.animate({top: '0px'}).hide();
                });

                var gsmEdit = $('#gsmEdit');
                var gsmEditLabel = $('#gsmEdit-label');
                gsmEdit.focus(function()
                {
                    gsmEditLabel.show().animate({top: '-25px'});
                }).blur(function () {
                    gsmEditLabel.animate({top: '0px'}).hide();
                });

                var countryEdit = $('#countryEdit');
                var countryEditLabel = $('#countryEdit-label');
                countryEdit.focus(function()
                {
                    countryEditLabel.show().animate({top: '-25px'});
                }).blur(function () {
                    countryEditLabel.animate({top: '0px'}).hide();
                });

                var langEdit = $('#langEdit');
                var langEditLabel = $('#langEdit-label');
                langEdit.focus(function()
                {
                    langEditLabel.show().animate({top: '-25px'});
                }).blur(function () {
                    langEditLabel.animate({top: '0px'}).hide();
                });

// Label End


// Notification Start

                var notificationHide=$('#notificationHide');
                var notificationAlert=$('#notificationAlert');
                $("[class*=main]").on('click',function () {
                    setTimeout(function(){
                        notificationAlert.animate({left:'1500px'}).hide('slow').animate({left:'1000px'});
                    }, 10000);
                });
                notificationHide.on('click',function () {
                    notificationAlert.animate({left:'1500px'}).hide('slow').animate({left:'1000px'});

                });


// Notification End


// BVALIDATOR JS START

                var locale=initialLocaleCode;

                var options = {
                    lang: locale,
                    messages: {
                        tr: {
                            'default' : 'Lütfen bu değeri düzeltin.',
                            minlen    : 'Uzunluğu en az {0} karakter olmalıdır.',
                            maxlen    : 'Uzunluğu en fazla {0} karakter olmalıdır.',
                            rangelen  : 'Uzunluğu {0} ve {1} arasında olmalıdır.',
                            min       : 'Lütfen daha büyük veya {0} eşit bir sayı girin.',
                            max       : 'Lütfen daha az ya da {0} eşit bir sayı girin.',
                            between   : 'Lütfen {0} ile {1} arasında bir sayı girin.',
                            required  : 'Alan boş geçilemez.',
                            alpha     : 'Sadece alfabetik karakterler giriniz.',
                            alphanum  : 'Sadece alfasayısal karakterler giriniz.',
                            digit     : 'Ondalıklı sayı girilebilir.',
                            number    : 'Lütfen rakam giriniz.',
                            email     : 'Mail adresi giriniz.',
                            url       : 'Lütfen geçerli bir URL girin.',
                            ip4       : 'Lütfen geçerli bir IPv4 adresi girin.',
                            ip6       : 'Lütfen geçerli bir IPv6 adresi girin.',
                            date      : '{0} Bu formatta bir tarih girin.',
                            equal     : 'Aynı değeri girin.',
                            differ    : 'Lütfen farklı bir değer girin.'

                        },
                        ee:{
                            'default' : 'Palun paranda see sisestus.',
                            minlen    : 'Pikkus peab olema vähemalt {0} märki.',
                            maxlen    : 'Pikkus voib olla maksimum {0} märki.',
                            rangelen  : 'Pikkus voib olla vahemikus {0} kuni {1}.',
                            min       : 'Palun sisesta number mis on suurem voi vordne {0} ga.',
                            max       : 'Palun sisesta number mis on väiksem voi vordne {0} ga.',
                            between   : 'Palun sisesta number vahemikus {0} kuni {1}.',
                            required  : 'Noutud väli.',
                            alpha     : 'Lubatud on ainult tähed.',
                            alphanum  : 'Lunatud on ainult tähed ju numbrid.',
                            digit     : 'Lubatud on ainult numbrid.',
                            number    : 'Palun sisesta korrektne number.',
                            email     : 'Palun sisesta korrektne email.',
                            url       : 'Palun sisesta korrektne URL.',
                            ip4       : 'Palun sisesta korrektne IPv4 aadress.',
                            ip6       : 'Palun sisesta korrektne IPv6 aadress.',
                            date      : 'Palun sisesta kuupäev formaadis {0}',
                            equal     : 'Palun sisesta sama väärtus uuesti.',
                            differ    : 'Palun sisesta erinev väärtus.'
                        },
                        es:{
                            'default' : 'Por favor, corrija este valor.',
                            minlen    : 'La longitud debe ser de al menos {0} caracteres.',
                            maxlen    : 'La longitud debe ser como mucho de {0} caracteres.',
                            rangelen  : 'La longitud debe ser de entre {0} y {1} caracteres.',
                            min       : 'Por favor, introduzca un numero mayor o igual que {0}.',
                            max       : 'Por favor, introduzca un numero menor o igual que {0}.',
                            between   : 'Por favor, introducza un numero entre {0} y {1}.',
                            required  : 'Este campo es obligatorio.',
                            alpha     : 'Por favor, introduzca sólo caracteres alfabéticos.',
                            alphanum  : 'Por favor, introduzca sólo caracteres alfanuméricos.',
                            digit     : 'Por favor, introduzca sólo dígitos.',
                            number    : 'Por favor, introduzca un número válido.',
                            email     : 'Por favor, introduzca un e-mail válido.',
                            url       : 'Por favor, introduza una URL válida.',
                            ip4       : 'Por favor, introduzca una dirección IPv4 válida.',
                            ip6       : 'Por favor, introduzca una dirección IPv6 válida.',
                            date      : 'Por favor, introduzca una fecha válida con el formato {0}',
                            equal     : 'Por favor, introduzca el mismo valor de nuevo.',
                            differ    : 'Por favor, introduzca un valor diferente.'
                        },
                        fr:{
                            'default' : 'Por favor, corrija o valor deste campo.',
                            minlen    : 'Ce champ doit contenir au moins {0} caractères.',
                            maxlen    : 'Ce champ doit contenir au maximum {0} caractères.',
                            rangelen  : 'Ce champ doit contenir entre {0} et {1} caractères.',
                            min       : 'Cette valeur doit être supériure ou égale à {0}.',
                            max       : 'Cette valeur doit être inférieure ou égale à {0}.',
                            between   : 'Entrer un nombre entre {0} et {1}.',
                            required  : 'Veuillez renseigner ce champ.',
                            alpha     : 'Seules les lettres sont acceptées.',
                            alphanum  : 'Utilisez des caractères alphanumériques seulement.',
                            digit     : 'Seuls les chiffres sont acceptés.',
                            number    : 'Veuillez saisir un nombre.',
                            email     : 'Veuillez entrer une adresse email valide.',
                            url       : 'Veuillez entrer une URL valide.',
                            ip4       : 'Veuillez fournir une adresse IPv4 valide.',
                            ip6       : 'Veuillez fournir une adresse IPv6 valide.',
                            date      : 'Vous devez entrer une date valide au format {0}',
                            equal     : 'Veuillez saisir la même valeur à nouveau.',
                            differ    : 'Veuillez saisir une autre valeur.'
                        },
                        hr:{
                            'default' : 'Ispravite ovu vrijednost.',
                            minlen    : 'Duljina mora biti najmanje {0} znakova.',
                            maxlen    : 'Duljina mora biti najviše {0} znakova.',
                            rangelen  : 'Duljina mora biti između {0} i {1} znakova.',
                            min       : 'Unesite broj veći ili jednak {0}.',
                            max       : 'Unesite broj manji ili jednak {0}.',
                            between   : 'Unesite broj između {0} i {1}.',
                            required  : 'Ovo polje je obavezno.',
                            alpha     : 'Unesite samo slova.',
                            alphanum  : 'Unesite samo slova i brojeve.',
                            digit     : 'Unesite samo brojeve.',
                            number    : 'Unesite ispravan broj.',
                            email     : 'Unesite ispravnu Email adresu.',
                            url       : 'Unesite ispravan URL.',
                            ip4       : 'Unesite ispravnu IPv4 adresu.',
                            ip6       : 'Unesite ispravnu IPv6 adresu.',
                            date      : 'Unesite ispravan datum u formatu {0}',
                            equal     : 'Unesite ponovno istu vrijednost.',
                            differ    : 'Unesite razlièitu vrijednost.'
                        },
                        ptbr:{
                            'default' : 'Por favor, corrija o valor deste campo.',
                            minlen    : 'O tamanho mínimo é de {0} caracteres.',
                            maxlen    : 'O tamanho máximo é de {0} caracteres.',
                            rangelen  : 'O tamanho deve ser entre  {0} e {1} caracteres.',
                            min       : 'Por favor, insira um número maior ou igual a {0}.',
                            max       : 'Por favor, insira um número menor ou igual a {0}.',
                            between   : 'Por favor, insira um número entre {0} e {1}.',
                            required  : 'Este campo tem preenchimento obrigatório.',
                            alpha     : 'Por favor, insira apenas caracteres alfabéticos.',
                            alphanum  : 'Por favor, insira apenas caracteres alfanuméricos.',
                            digit     : 'Por favor, insira apenas dígitos.',
                            number    : 'Por favor, insira um número válido.',
                            email     : 'Por favor, insira um e-mail válido.',
                            url       : 'Por favor, insira uma URL válida.',
                            ip4       : 'Por favor, insira um endereço IPv4 válido.',
                            ip6       : 'Por favor, insira um endereço IPv6 válida.',
                            date      : 'Por favor, insira uma data válida no formato {0}',
                            equal     : 'Por favor, insira o mesmo valor novamente.',
                            differ    : 'Por favor, insira um valor diferente.'
                        },
                        pt:{
                            'default' : 'Lütfen bu değeri düzeltin.',
                            minlen    : 'Uzunluğu en az {0} karakter olmalıdır.',
                            maxlen    : 'Uzunluğu en fazla {0} karakter olmalıdır.',
                            rangelen  : 'Uzunluğu {0} ve {1} arasında olmalıdır.',
                            min       : 'Lütfen daha büyük veya {0} eşit bir sayı girin.',
                            max       : 'Lütfen daha az ya da {0} eşit bir sayı girin.',
                            between   : 'Lütfen {0} ile {1} arasında bir sayı girin.',
                            required  : 'Alan boş geçilemez.',
                            alpha     : 'Sadece alfabetik karakterler giriniz.',
                            alphanum  : 'Sadece alfasayısal karakterler giriniz.',
                            digit     : 'Ondalıklı sayı girilebilir.',
                            number    : 'Lütfen rakam giriniz.',
                            email     : 'Mail adresi giriniz.',
                            url       : 'Lütfen geçerli bir URL girin.',
                            ip4       : 'Lütfen geçerli bir IPv4 adresi girin.',
                            ip6       : 'Lütfen geçerli bir IPv6 adresi girin.',
                            date      : '{0} Bu formatta bir tarih girin.',
                            equal     : 'Aynı değeri girin.',
                            differ    : 'Lütfen farklı bir değer girin.'
                        }
                    }
                };
                $('#addEventForm').bValidator(options);
                $('#editEventForm').bValidator(options);
    //  console.log($('#addEventForm').data('bValidator').validate());
    /* if() {
         $('#addEventSubmit').prop("disabled", false);
     }*/

// BVALIDATOR JS END

// Add Modal Açılması
                var newAppointmentBtn=$('#newAppointment');
                newAppointmentBtn.on('dblclick',function () {
                    $('#ModalAdd').modal('show');
                });
// Add Modal için Maintenance'nin DB'den Getirilmesi




                $.ajax({
                   url:'/dHome/getMaintenance',
                   type:'get',
                    data:{
                        _token:'0GTwvcp5NWn7zBVtu6lSH4R5GhTRLaCYDoJvnqNT'
                    },
                   dataType:'json',
                   success:function (maintenanceData) {
                       globalMaintenance=maintenanceData;

                       for(j=0;j<maintenanceData.length;j++)
                       {

                        var maintenance ='('+moment(maintenanceData[j]["maintenanceMinute"], "HH:mm").format("HH:mm")+') '+maintenanceData[j]["maintenanceTitle"];
                       $('#maintenanceTable').append( '<tr style="line-height: 1px !important;" class="maintenanceRow" ><td  class="checkboxMaintenance">'+maintenance+'</td> <td >'
                           +
                           '<div class=" custom-switch custom-control ">  <input class="custom-control-input  checkboxMaintenanceInput "  type="checkbox" value="'+maintenance+'" name="maintenance[]" id="maintenance'+j+'" > <label for="maintenance'+j+'" class="custom-control-label   "></label></div></td></tr>');


                       }

                   }
                });
//
                var maintenanceEye=$('#maintenanceEye');
                var maintenance=$('#maintenance');
                maintenanceEye.on('click',function () {
                    if(maintenance.attr("style") === "display: none;"){
                        maintenanceEye.find('i').addClass( "fa-angle-up" );
                        maintenanceEye.find('i').removeClass( "fa-angle-down" );
                        maintenance.slideDown('slow');

                        }
                    else if(maintenance.attr("style") != "display: none;"){
                        maintenance.slideUp('slow');
                        maintenanceEye.find('i').removeClass( "fa-angle-up" );
                        maintenanceEye.find('i').addClass( "fa-angle-down" );
                    }
                });

// Add Modal için Maintenance Add Ajax
                 var maintenanceAddSubmit=$('#maintenanceAddSubmit');
                $('#maintenanceAdd').on('dblclick',function () {
                    $('#ModalAdd').modal('hide');
                    $('#MaintenanceAddModal').toggle('show');
                    maintenanceAddSubmit.prop( "disabled", false );

                });


//MODAL CLOSE
// Add Modal için Maintenance Add Ajax
                $('#maintenanceAddCloseX,#maintenanceAddClose').click(function () {
                    $('#ModalAdd').modal('show');
                    $('#MaintenanceAddModal').toggle('hide');
                });
//Add Modal için Maintenance Edit Ajax
                $('#maintenanceEditCloseX,#maintenanceEditClose').click(function () {
                    $('#ModalAdd').modal('show');
                    $('#MaintenanceEditModal').toggle('hide');
                });
//Add Modal için Maintenance Delete Ajax
                $('#maintenanceDeleteCloseX,#maintenanceDeleteClose').click(function () {
                    $('#ModalAdd').modal('show');
                    $('#MaintenanceDeleteModal').toggle('hide');
                });
//MODAL INPUT LABEL ANIMATION

                var maintenanceTitleFB = $('#maintenanceTitle');
                var maintenanceTitleLabel = $('#maintenanceTitle-label');
                maintenanceTitleFB.focus(function()
                {
                    maintenanceTitleLabel.show().animate({top: '-25px'});
                }).blur(function () {
                    maintenanceTitleLabel.animate({top: '0px'}).hide();
                });

                var maintenanceMinuteFB = $('#maintenanceMinute');
                var maintenanceMinuteLabel = $('#maintenanceMinute-label');
                maintenanceMinuteFB.focus(function()
                {
                    maintenanceMinuteLabel.show().animate({top: '-25px'});
                }).blur(function () {
                    maintenanceMinuteLabel.animate({top: '0px'}).hide();
                });
// MODAL ADD,EDİT,DELETE AJAX TECHNOLOGY


    // Add Ajax
                var maintenanceAddForm=$('#maintenanceAddForm');

                maintenanceAddForm.submit(function (e) {

                    maintenanceAddSubmit.prop( "disabled", true );
                    e.preventDefault();
                    $.ajaxSetup({
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')

                        }
                    });
                    $.ajax({
                       url:'/dHome/addMaintenance',
                       type:'post',
                       data:maintenanceAddForm.serialize(),
                       dataType:'json',
                       success:function (data) {

                           var maintenance  = '('+moment(data["maintenanceMinute"], "HH:mm").format("HH:mm")+') '+data["maintenanceTitle"];
                           $('#maintenanceTable').append('<tr style="line-height: 1px !important;" class="maintenanceRow" ><td  class="checkboxMaintenance">'+maintenance+'</td> <td ><div class=" custom-switch custom-control ">  <input class="custom-control-input  checkboxMaintenanceInput "  type="checkbox" value="'+maintenance+'" name="maintenance[]" id="maintenance'+j+'" > <label for="maintenance'+j+'" class="custom-control-label   "></label></div></td></tr>');


                           $('#notificationAlert').addClass('alert-success').removeClass('alert-danger');//Bakım eklenmesi notification start
                           $(".notification-text").html("Maintenance Added");
                           $('#notificationAlert').show();//Bakım eklenmesi notification end
                           $('#MaintenanceAddModal').toggle('hide');//Bakım eklenmesi modal gizlenmesi start
                           $('#ModalAdd').modal('show');//Event eklenmesi modalı gösterilmesi

                        }
                    });


                     });

        // Edit Ajax


                  var maintenanceEditSubmit=$('#maintenanceEditSubmit');
                  var maintenanceChekbox=null;
                  var maintenanceEditTitle =null;
                  var maintenanceEditMinute =null;
                  $('#maintenanceEdit').on('dblclick',function () {//Bakım türü modalında ki edit butonuna çift tıklama
                      $('#ModalAdd').modal('hide');
                      $('#MaintenanceEditModal').toggle('show');
                      $.each($("input[name='maintenance[]']:checked"), function(){//Checkbox'ın seçilmesi

                          maintenanceChekbox=$(this).val();
                      });
                      maintenanceEditTitle = maintenanceChekbox.substr(8);
                      maintenanceEditMinute = maintenanceChekbox.substr(1,5);
                     $('#MaintenanceEditModal #maintenanceEditTitle').val(maintenanceEditTitle);
                      $('#MaintenanceEditModal #maintenanceEditMinute').val(maintenanceEditMinute);
                     maintenanceEditSubmit.prop( "disabled", false );//Bakım türü modalında ki submit enable edilmesi
                  });


                    var maintenanceEditForm=$('#maintenanceEditForm');//Bakım türü modalında ki form'un değişkene atılması

                         maintenanceEditForm.submit(function (e) {

                        maintenanceEditSubmit.prop( "disabled", true );//Bakım türü modalında ki submit disable edilmesi
                        e.preventDefault();
                        $.ajaxSetup({
                            headers: {
                                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')

                            }
                        });

                        $.ajax({
                            url:'/dHome/editMaintenance',
                            type:'post',
                            data: maintenanceEditForm.serialize()+ "&maintenanceEditTitleOld=" + maintenanceEditTitle,//Tüm form elemanları ile birlikte eski Bakım title'i gönderilmesi
                            dataType:'json',
                            success:function (data) {
                                $.each($("input[name='maintenance[]']:checked"), function(){//Seçilen checkbox'ın 2 üst elemanının gizlenmesi
                                    $(this).parent().parent().parent().hide();
                                    });
                               var maintenance  = '('+moment(data["maintenanceMinute"], "HH:mm").format("HH:mm")+') '+data["maintenanceTitle"];
                                $('#maintenanceTable').append('<tr style="line-height: 1px !important;" class="maintenanceRow" ><td  class="checkboxMaintenance">'+maintenance+'</td> <td ><div class=" custom-switch custom-control ">  <input class="custom-control-input  checkboxMaintenanceInput "  type="checkbox" value="'+maintenance+'" name="maintenance[]" id="maintenance'+j+'" > <label for="maintenance'+j+'" class="custom-control-label   "></label></div></td></tr>');



                                $('#notificationAlert').addClass('alert-success').removeClass('alert-danger');//Bakım eklenmesi notification start
                                $(".notification-text").html("Maintenance Edited");
                                $('#notificationAlert').show();//Bakım eklenmesi notification end
                                $('#MaintenanceEditModal').toggle('hide');//Bakım eklenmesi modal gizlenmesi start
                                $('#ModalAdd').modal('show');//Event eklenmesi modalı gösterilmesi



                            }
                        });


                        });
            // Delete Ajax

            // Add Modal için Maintenance Delete
                        var maintenanceDeleteSubmit = $('#maintenanceDeleteSubmit');
                        var maintenanceDeleteTitle;
                        var maintenanceChekbox;
                        $('#maintenanceDelete').on('dblclick',function () {

                            $('#ModalAdd').modal('hide');
                            $('#MaintenanceDeleteModal').toggle('show');
                            $.each($("input[name='maintenance[]']:checked"), function(){
                                maintenanceChekbox=$(this).val();
                            });
                            maintenanceDeleteTitle = maintenanceChekbox.substr(8);
                             $('#MaintenanceDeleteModal #maintenanceDeleteSelect').html(maintenanceDeleteTitle);


                            maintenanceDeleteSubmit.prop( "disabled", false );
                        });

                         maintenanceDeleteSubmit.click(function (e) {

                            maintenanceDeleteSubmit.prop( "disabled", true );
                            e.preventDefault();


                            $.ajax({
                                url:'/dHome/deleteMaintenance',
                                type:'get',
                                data:
                                    {
                                        maintenanceDeleteTitle:maintenanceDeleteTitle
                                    },//Tüm form elemanları ile birlikte eski Bakım title'i gönderilmesi
                                dataType:'json',
                                success:function (data) {

                                    $.each($("input[name='maintenance[]']:checked"), function(){
                                        $(this).parent().parent().parent().hide();
                                    });



                                    $('#notificationAlert').addClass('alert-success').removeClass('alert-danger');//Bakım eklenmesi notification start
                                    $(".notification-text").html("Maintenance deleted");
                                    $('#notificationAlert').show();//Bakım eklenmesi notification end
                                    $('#MaintenanceDeleteModal').toggle('hide');//Bakım eklenmesi modal gizlenmesi start
                                    $('#ModalAdd').modal('show');//Event eklenmesi modalı gösterilmesi
                                }
                            });


                        });
                    //Maintenance Add,Edit,Delete Popever JS

                    $(function () {
                        $('[data-toggle="popover"]').popover()
                    })
                    $('.popover-dismiss').popover({
                        trigger: 'focus'
                    })
                    //Web sitesi optimizasyonu içn css link etiketlerini geçiktirme

                    var loadDeferredStyles = function() {
                        var addStylesNode = document.getElementById("deferred-styles");
                        var replacement = document.createElement("div");
                        replacement.innerHTML = addStylesNode.textContent;
                        document.body.appendChild(replacement)
                        addStylesNode.parentElement.removeChild(addStylesNode);
                    };
                    var raf = requestAnimationFrame || mozRequestAnimationFrame ||
                        webkitRequestAnimationFrame || msRequestAnimationFrame;
                    if (raf) raf(function() {
                        window.setTimeout(loadDeferredStyles, 0);
                    });
                    else window.addEventListener('load', loadDeferredStyles);
            //Css link optimizasyon --------- End





            //FullCalendar Top Button
            var count=0;
            if (window.matchMedia('(max-width: 767px)').matches) {

                //console.log('as');


            }
            $( window ).resize(
                function (){

                    $.each($(".btn-primary"),function () {

                        for (i=3;i<count;i++) {
                            if (window.matchMedia('(max-width: 767px)').matches) {

                                $(this).hide();


                            } else {


                                $(this).show();


                            }
                        }
                        count++;
                    });
                    count=0;
                });

            //Workplace Setting
            var workplaceSettingsForm = $('#workplaceSettingsForm');
            var workplaceSettingsSubmit = $('#workplaceSettingsSubmit');
                $('#workplaceButton').click(function () {


                    $.ajax({
                        url:'/dHome/getWorkplace',
                        type:'get',
                        data:{
                            _token:'0GTwvcp5NWn7zBVtu6lSH4R5GhTRLaCYDoJvnqNT'
                        },
                        dataType:'json',
                        success:function (data) {

                                workplaceSettingsForm.find('#id').val(data[0]["id"]);
                                workplaceSettingsForm.find('#workplaceName').val(data[0]["workplaceName"]);
                                workplaceSettingsForm.find('#defaultDate').val(data[0]["defaultDate"]);
                                workplaceSettingsForm.find('#minTime').val(data[0]["minTime"]);
                                workplaceSettingsForm.find('#maxTime').val(data[0]["maxTime"]);
                                workplaceSettingsForm.find('#weekends').attr('checked',data[0]["weekends"]);
                                workplaceSettingsForm.find('#defaultView').find('#'+data[0]["defaultView"]).attr('checked',true);
                                 $("#workplaceSettingsModal").modal('show');
                        }
                    });

                });

                //Workplace Submit Ajax Set
            workplaceSettingsForm.submit(function (e) {
                workplaceSettingsSubmit.prop( "disabled", true );
                e.preventDefault();
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')

                    }
                });
                $.ajax({
                    url:'/dHome/postWorkplace',
                    type:'post',
                    data:workplaceSettingsForm.serialize(),
                    dataType:'json',
                    success:function (data) {

                        workplaceSettingsForm.find('#workplaceName').val(data["workplaceName"]);
                        workplaceSettingsForm.find('#defaultDate').val(data["defaultDate"]);
                        workplaceSettingsForm.find('#minTime').val(data["minTime"]);
                        workplaceSettingsForm.find('#maxTime').val(data["maxTime"]);
                        workplaceSettingsForm.find('#weekends').attr('checked',data["weekends"]);
                        workplaceSettingsForm.find('#defaultView').find('#'+data["defaultView"]).attr('checked',true);
                        workplaceSettingsSubmit.prop( "disabled", false );
                        $('#notificationAlert').addClass('alert-success').removeClass('alert-danger');//İş yeri güncellemesi notification start
                        $(".notification-text").html("Workplace Settings Updated");
                        $('#notificationAlert').show();//İş yeri güncellemesi notification end
                    }
                });

            });





            //Workplace Setting Input Label Scroll

            //Workplace Name
            var workplaceNameLabel= workplaceSettingsForm.find('#workplaceName-label');
            var workplaceName= workplaceSettingsForm.find('#workplaceName');
            workplaceName.focus(function()
            {

                workplaceNameLabel.show().animate({top: '-22px'});
            }).blur(function () {
                workplaceNameLabel.animate({top: '00px'});
            });
            //Workplace Default Date
            var defaultDateLabel= workplaceSettingsForm.find('#defaultDate-label');
            var defaultDate= workplaceSettingsForm.find('#defaultDate');
            defaultDate.focus(function()
            {

                defaultDateLabel.show().animate({top: '-22px'});
            }).blur(function () {
                defaultDateLabel.animate({top: '00px'});
            });
            //Workplace Min Time
            var minTimeLabel= workplaceSettingsForm.find('#minTime-label');
            var minTime= workplaceSettingsForm.find('#minTime');
            minTime.focus(function()
            {

                minTimeLabel.show().animate({top: '-22px'});
            }).blur(function () {
                minTimeLabel.animate({top: '00px'});
            });
            //Workplace Max Time
            var maxTimeLabel= workplaceSettingsForm.find('#maxTime-label');
            var maxTime= workplaceSettingsForm.find('#maxTime');
            maxTime.focus(function()
            {

                maxTimeLabel.show().animate({top: '-22px'});
            }).blur(function () {
                maxTimeLabel.animate({top: '00px'});
            });

            //Bridges Get Ajax

            $.ajax({
                        url:'/bridges',
                        type:'get',
                         dataType:'json',
                        success:function (data) {

                            for (var i=0;i<data.length;i++) {

                                    bridgesSelector.append("<option  data-id='"+data[i]['id']+"' value='" + data[i]['bridge_name'] + "'>" + data[i]['bridge_name'] + "</option>");


                             }

                        }
                    });


            //Bridge Add
            var bridgeAdd= $('#bridgeAdd');
            $( "#dialogAdd" ).dialog({
                position: {
                    my: "center",
                    at: "center",
                    of: window
                },
                autoOpen: false,
                title: "Bridge Add",
                height: 250,
                closeText: "",

            });
            bridgeAdd.on('dblclick',function () {
                $( "#dialogAdd" ).dialog( "open" );
                $( "#dialogDelete" ).dialog( "close" );
                $( "#dialogEdit" ).dialog( "close" );
            });
            var bridgeAddForm = $('#bridgeAddForm');
            var bridgeAddSubmit = $('#bridgeAddSubmit');
            bridgeAddForm.submit(function (e) {
                bridgeAddSubmit.prop('disabled',true);

                e.preventDefault();
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')

                    }
                });
                $.ajax({
                    url:'/bridgesAdd',
                    type:'post',
                    data:bridgeAddForm.serialize(),
                    dataType:'json',
                    success:function (data) {
                        bridgesSelector.append("<option data-id='"+data['id']+"'  value='" + data['bridge_name'] + "'>" + data['bridge_name'] + "</option>");
                        $( "#dialogAdd" ).dialog( "close");
                        bridgeAddSubmit.prop( "disabled", false );
                        $('#notificationAlert').addClass('alert-success').removeClass('alert-danger');//İş yeri güncellemesi notification start
                        $(".notification-text").html("Bridges Added");
                        $('#notificationAlert').show();//İş yeri güncellemesi notification end
                    }
                });
            });

            //Bridge Delete
                var bridgeDelete= $('#bridgeDelete');
                var bridgeDeleteForm = $('#bridgeDeleteForm');
                var selectedBridge;
                $( "#dialogDelete" ).dialog({
                    position: {
                        my: "center",
                        at: "center",
                        of: window
                    },
                    autoOpen: false,
                    title: "Bridge Delete",
                    height: 170,
                    closeText: "",

                }).prev(".ui-dialog-titlebar").attr("style","background-color:#e22620 !important;border-color:#e22620 !important;");

                bridgesSelector.on('change',function(){
                    selectedBridge = $(this).children("option:selected"). val();
                    var selectedBridgeId = $(this).children("option:selected").data('id');
                    $('#bridgeDeleteSelect').html(selectedBridge);
                    bridgeDeleteForm.find('#bridgeId').attr('value',selectedBridgeId);

                });

                bridgeDelete.on('dblclick',function () {
                    if(selectedBridge==null || selectedBridge=="Bridge Choose") {
                        $('#notificationAlert').addClass('alert-danger').removeClass('alert-success');
                        $(".notification-text").html("Please choose a bridge");
                        $('#notificationAlert').show();
                    }
                    else
                        {
                            $("#dialogDelete").dialog("open");
                            $( "#dialogAdd" ).dialog( "close" );
                            $( "#dialogEdit" ).dialog( "close" );
                        }
                });



            var bridgeDeleteSubmit = $('#bridgeDeleteSubmit');
            bridgeDeleteForm.submit(function (e) {
            bridgeDeleteSubmit.prop('disabled',true);

            e.preventDefault();
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')

                }
            });
            $.ajax({
                url:'/bridgesDelete',
                type:'post',
                data:{
                    bridgeId:bridgeDeleteForm.find('#bridgeId').val(),
                    _token:bridgeDeleteForm.find('input[name="_token"]').val()
                },
                dataType:'json',
                success:function (data) {
                    $( "#dialogDelete" ).dialog( "close" );
                    bridgesSelector.each(function () {
                        console.log($(this).find('option:selected').data('id'))
                        if($(this).find('option:selected').data('id')==data['id'])
                        {
                            $(this).find('option:selected').remove();
                        }
                    });
                    bridgeDeleteSubmit.prop( "disabled", false );
                    $('#notificationAlert').addClass('alert-danger').removeClass('alert-success');
                    $(".notification-text").html("Bridges Deleted");
                    $('#notificationAlert').show();
                }
                });
            });

        //Bridge Edit
            var bridgeEdit= $('#bridgeEdit');
            var bridgeEditForm = $('#bridgeEditForm');
            var selectedBridge;
            $( "#dialogEdit" ).dialog({
                position: {
                    my: "center",
                    at: "center",
                    of: window
                },
                autoOpen: false,
                title: "Bridge Edit",
                height: 200,
                closeText: "",

            }).prev(".ui-dialog-titlebar").attr("style","background-color:#369 !important; border-color:#369 !important;");

            bridgesSelector.on('change',function(){
                selectedBridge = $(this).children("option:selected"). val();
                var selectedBridgeId = $(this).children("option:selected").data('id');

                bridgeEditForm.find('#bridgeNameEdit').val(selectedBridge);
                bridgeEditForm.find('#bridgeIdEdit').attr('value',selectedBridgeId);

            });

            bridgeEdit.on('dblclick',function () {
                if(selectedBridge==null || selectedBridge=="Bridge Choose") {
                    $('#notificationAlert').addClass('alert-danger').removeClass('alert-success');
                    $(".notification-text").html("Please choose a bridge");
                    $('#notificationAlert').show();
                }
                else
                {
                    $("#dialogEdit").dialog("open");
                    $( "#dialogAdd" ).dialog( "close" );
                    $( "#dialogDelete" ).dialog( "close" );
                }
            });



            var bridgeEditSubmit = $('#bridgeEditSubmit');
            bridgeEditForm.submit(function (e) {
                bridgeEditSubmit.prop('disabled',true);

                e.preventDefault();
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')

                    }
                });
                $.ajax({
                    url:'/bridgesEdit',
                    type:'post',
                    data:bridgeEditForm.serialize(),
                    dataType:'json',
                    success:function (data) {
                        $( "#dialogEdit" ).dialog( "close" );
                        bridgesSelector.each(function () {
                            var selectorId=$(this).find('option:selected').data('id');
                            if(selectorId==data['id'])
                            {
                                $(this).find('option:selected').remove();


                            }


                        });
                        bridgesSelector.append("<option data-id='"+data['id']+"'  value='" + data['bridge_name'] + "'>" + data['bridge_name'] + "</option>");





                        bridgeEditSubmit.prop( "disabled", false );
                        $('#notificationAlert').addClass('alert-succes').removeClass('alert-danger');
                        $(".notification-text").html("Bridges Edited");
                        $('#notificationAlert').show();
                    }
                });
            });

            // Bridge Date Time

                var bridgeDatetimeDeleteForm = $('#bridgeDatetimeDeleteForm');
                var bridgeDatetimeDeleteSubmit = $('#bridgeDatetimeDeleteSubmit');
                bridgeDatetimeDeleteForm.submit(function (e) {
                    console.log(bridgeDatetimeDeleteForm.find('#bridgeDatetimeId').val())
                    bridgeDatetimeDeleteSubmit.prop('disabled', true);
                    var bridgeDatetimeId=bridgeDatetimeDeleteForm.find('#bridgeDatetimeId').val();
                    e.preventDefault();
                    $.ajaxSetup({
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')

                        }
                    });
                    $.ajax({
                        url: '/dHome/bridgeDatetimeDelete',
                        type: 'post',
                        data: {
                            id: bridgeDatetimeId,
                            _token: bridgeDatetimeDeleteForm.find('input[name="_token"]').val()
                        },
                        dataType: 'json',

                        success: function (data) {
                            $("#dialogBridgeDatetimeDelete").dialog("close");
                            var event = calendar.getEventById(bridgeDatetimeId);
                            event.remove();
                            _.remove(renderedBridges, function(n) {
                                return n.id == bridgeDatetimeId;
                            });
                            bridgeDatetimeDeleteSubmit.prop("disabled", false);
                            $('#notificationAlert').addClass('alert-danger').removeClass('alert-success');
                            $(".notification-text").html("Bridges Deleted");
                            $('#notificationAlert').show();
                        }
                    });
                });


                // Appointment In Appointment Close
            $('.appointmentInAppointmentClose').on('click',function () {
                var appointmentInBridge=$('#clickBridgeForm').find('table').find('tbody');
                appointmentInBridge.html('');
            });

            /*Randevu Ekleme Modalında ki Bakım türü Switchlerinni Seçilip Submit butonunun enable edilmesi [start]*/
            var addEventSubmit=$('#addEventSubmit');
            addEventSubmit.attr('disabled',true);

            jQuery(document).on('click', "input[name='maintenance[]']" , function(event){

                addEventSubmit.attr('disabled',true);
                $.each($("input[name='maintenance[]']:checked"),function () {

                        addEventSubmit.attr('disabled', false);

                });

            });
             /*Randevu Ekleme Modalında ki Bakım türü Switchlerinni Seçilip Submit butonunun enable edilmesi [end]*/





});
