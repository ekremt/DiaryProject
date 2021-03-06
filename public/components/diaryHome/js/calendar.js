var calendar; // Calendar değişkeni Global olarak tanımlandı
var calendarEl = document.getElementById('calendar'); // Calendar idli div'in değişkene atanması
var renderedBridges;//Bridge'lerin Render Edilmiş Hali için Kullanılan Array
var renderedBridgesData;//Bridge'ler de Next Prev için Render
var addEventData=[];//Randevu Eklenmesi İçin Verilerin Alındığı Array
var appointmentData;
$(document).ready(function () {

            var localeSelectorEl = document.getElementById('locale-selector'); // Dil için seçilen dilin aktarılması için
            var today = moment().day().today; // Bugünü moment ile formatlayıp alma
            var j=0;
            const promiseBridges = new Promise(function(resolve, reject){
                if (resolve) {
                    $.ajax({
                        url: '/dHome/getBridgeDateTime',
                        type:'get',
                        success:function (rawData) {
                            renderedBridgesData=rawData;
                            resolve(rawData);
                            console.log(1)
                        },
                        error: function() {
                            alert('There was an error while fetching events.');
                        }
                    });
                } else {
                  reject('Error');
                }
              });

              const promiseBusiness = new Promise(function(resolve, reject){
                    if (resolve) {
                        promiseBridges.then(function(cevap){
                                cevap.forEach(function(items){
                                    items['rendering']='background';
                                    items['className']='fc-nonbusiness';
                                });
                               console.log(2)
                               resolve(cevap);
                        });
                    }
                    else {
                        reject('Error');
                    }
              });

              promiseBusiness.then(function(cevap){
                  renderedBridges=cevap;
                console.log(renderedBridges)
                calendar.addEventSource(cevap);
              });

    initThemeChooser({

        init: function(themeSystem) {
            calendar = new FullCalendar.Calendar(calendarEl, {
                plugins: [ 'bootstrap', 'interaction', 'dayGrid', 'timeGrid', 'list' ], // Calendar'ın kullanacağı pluginleri import edilmesi
                themeSystem: themeSystem, // Tema sisteminin belirtilmesi
                header: { // Üst taraftaki alan
                        left: 'prev,next today custom,custom2', // prevYear:önceki yıl,prev:önceki ay,next:sonraki ay,nextYear:sonraki yıl,today: bugün, custom:eğer kendimiz bir buton koymamız gerekirse kullanıcak buton
                        center: 'title', // Ortadaki başlık
                        right: 'timeGridWeek,timeGridDay,listMonth' // dayGridMonth: Günlerin olduğu ay,timeGridWeek:haftanın liste halinde gösterilmesi,timeGridDay:Günün saatlerinin liste(grid) halinde gösterilmesi,listMonth:Belitrilen aydaki tüm eventlerin listelenmesi
                },
                customButtons: {
                    custom: {
                        text: 'Detail',
                        click: function() {
                            var selectedBridge = bridgesSelector.children("option:selected").val();//Köprülerin tarih-saat aralığını seçmek için global olan selector'ün alınması
                            if(selectedBridge==null || selectedBridge=='Bridge Choose') {
                                calendar.removeAllEvents();
                                appointmentData.forEach(function (items) {
                                    items['rendering'] = '';
                                    items['className'] = 'context-menu-one context-class ';
                                });
                                calendar.addEventSource(appointmentData);
                                calendar.addEventSource(renderedBridges);
                                calendar.setOption('selectable', false);
                                calendar.setOption('slotDuration', '00:30');
                                calendar.render();
                            }

                        }
                    },
                    custom2: {
                        text: 'Reverse',
                        click: function() {
                            var selectedBridge = bridgesSelector.children("option:selected").val();//Köprülerin tarih-saat aralığını seçmek için global olan selector'ün alınması
                            if(selectedBridge==null || selectedBridge=='Bridge Choose') {
                                calendar.removeAllEvents();
                                appointmentData.forEach(function (items) {
                                    items['rendering'] = 'background';
                                    items['className'] = 'context-menu-one context-class event-dark ';
                                });
                                calendar.addEventSource(appointmentData);
                                calendar.addEventSource(renderedBridges);
                                calendar.setOption('selectable', false);
                                calendar.setOption('slotDuration', '00:30');
                                calendar.render();
                            }


                        }
                    }
                },
                defaultView:['timeGridWeek'],
                slotDuration: '00:30', // Default olarak time aralığı
                defaultDate: today, //Varsayılan tarih
                weekNumbers: true, // Hafta Numaralarının gösterilmesi
                navLinks: true, // Günlerin ayrıntısı için gerekli link
                editable: true, //Değiştirilebilrliğinin aktif edilmesi
                resizable: true, // Boyutun uzatılmasının aktifleştirilmesi
                eventLimit: true, // Bir günde görüntülenen etkinlik sayısını sınırlar.Dokümantasyondan view parametresi alınarak sınırlandırılabilir.
                droppable:false,
                unselectAuto:true,//Seçilen alan başka bir yere tıklandığında kaybolması
                selectOverlap:true,//Seçilen alan kesişmesini engeller
                views: {
                        timeGrid: {
                            eventLimit: 6 // adjust to 6 only for timeGridWeek/timeGridDay
                        }
                }, // Context-Menu için eventlara class atanması
                selectable: false, //Kullanıcının tıklayıp sürükleyerek birden fazla gün veya zaman dilimini vurgulamasına izin verir.
                selectMirror: true, // Kullanıcı sürüklerken bir “yer tutucu” etkinliği çizilip çizilmeyeceği. Eğer True dersek biraz uzaktan sürüklenerek gider.
                allDaySlot:false,//Tüm Gün Eklenmesi İptal Edilmesi
                eventOverlap:true,// Günlerin Kesişmesini Engeller
                firstDay:moment().day(),
                nowIndicator:true,
                loading: function(bool) {
                    if (bool) {
                        $('#loading').show();
                    }else{
                        $('#loading').hide();

                    }
                },
                select: function(event) { //Tarih / saat seçimi yapıldığında tetiklenir.

                        $('#editEventForm')[0].reset();//Diğer Form'da ki verilerin temizlenmesi işlemi bu işlemin yapılmasının nedeni iki form da aynı anda dom üzerinde durduğu için hatalara neden oluyor
                        $('#editEventForm').find("input[name='maintenance[]']:checked").prop('checked', false);

                        selectDiff(event);

                        var selectedBridge = bridgesSelector.children("option:selected"). val();//Köprülerin tarih-saat aralığını seçmek için global olan selector'ünün seçili olanının değerinin alınması
                        var bridgeId = bridgesSelector.children("option:selected"). data('id');//Köprülerin tarih-saat aralığını seçmek için global olan selector'ünün seçili olanın data-id'sinin alınması
                        if(selectedBridge=="Bridge Choose" || selectedBridge==null)
                        {
                            selectAddAppointment(event,addEventData);
                        }
                        else
                        {
                            bridgeDateTime(selectedBridge,event,selectedBridge,bridgeId);
                        }
                },
                eventClick: function(info) {
                        var selectedBridge = bridgesSelector.children("option:selected").val();//Köprülerin tarih-saat aralığını seçmek için global olan selector'ün alınması
                        if(selectedBridge==null || selectedBridge=='Bridge Choose') {
                            clickEventJoinMaintenance(info);
                        }
                        else
                        {
                            clickBridge(info);
                        }
                },
                events:function(fetchInfo, successCallback, failureCallback) {
                        $.ajax({
                            url: '/dHome/getEvent?_token=0GTwvcp5NWn7zBVtu6lSH4R5GhTRLaCYDoJvnqNT',
                            type:'get',
                            success:function (rawData ) {
                               /* rawData.forEach(function(items){
                                    items['rendering']='background';

                                });*/
                                appointmentData=rawData;
                                successCallback(rawData);

                            },
                            error: function() {
                                alert('There was an error while fetching events.');
                            }
                        });
                  },
                selectAllow:function(selectInfo){
                        var selectedBridge = bridgesSelector.children("option:selected"). val();//Köprülerin tarih-saat aralığını seçmek için global olan selector'ünün seçili olanının değerinin alınması
                        var bool=[];

                        if(selectedBridge=="Bridge Choose" || selectedBridge==null)
                        {
                          return  selectAllowBridge(selectInfo,bool);
                        }
                        else{
                           return true;
                        }
                },
                eventRender: function(info) {
                        /*  var busLength= $('.fc-content-skeleton').find('table').find('.fc-nonbusiness').length;
                        var bus =$('.fc-content-skeleton').find('table').find('.fc-nonbusiness');
                        for(var i=0;i<busLength;i++)
                        {
                            $(bus[i]).on('click',function () {
                                alert('Müsait Değil');
                            });
                        }*/

                        if(info.el.className=='fc-nonbusiness fc-bgevent')
                        {

                            $(info.el).attr("id", info.event.id);/*.popover({
                                animation:true,
                                delay: 300,
                                content: 'Double click for bridge detail in '+info.event.title,
                                trigger: 'hover'
                            }).attr('title','');*/
                        }
                        else {
                            $(info.el).attr("id", info.event.id).addClass('context-menu-one context-class event-dark');/*.popover({
                                animation:true,
                                delay: 300,
                                content: 'Click for appointment detail in '+info.event.title,
                                trigger: 'hover'
                            });*/
                        }
                        $(info.el).attr("title",info.event.title);
                        var selectedBridge = bridgesSelector.children("option:selected").val();//Köprülerin tarih-saat aralığını seçmek için global olan selector'ün alınması
                        if(selectedBridge=="Bridge Choose" || selectedBridge==null)
                        {
                        }
                        else
                        {
                            $(info.el).attr("style","background-color:#17225e !important;border-color:#17225e !important");
                        }
                },
                eventDrop: function(info) {
                      eventDrop(info);
                },
                eventResize: function(info) {
                     eventResize(info);
                },
                dayRender: function( dayRenderInfo ) {
                        var today=moment().day().today;//Bugünden önceki timeların rengini değiştirme
                        var todayFormat=moment(today);
                        if(todayFormat-86400000>moment(dayRenderInfo.date))//Burdaki sayı bir günün milisaniye cinsinden karşılığıdır.
                        {
                            dayRenderInfo.el.style.backgroundColor='#C3C3C3';
                        }
                        var selectedBridge = bridgesSelector.children("option:selected").val();//Köprülerin tarih-saat aralığını seçmek için global olan selector'ün alınması
                        if(selectedBridge==null || selectedBridge=='Bridge Choose')
                        {
                        //  dayRenderInfo.el.style.backgroundColor='#ecb6b6';
                        }
                        else
                        {
                         //  dayRenderInfo.el.style.backgroundColor='#64bfdd';
                        }
                 },

            });
                        calendar.render();//İlk Render Edilmesi
                        //Calendar Multi Language [Start]
                        calendar.setOption('locale', initialLocaleCode);
                        calendar.getAvailableLocaleCodes().forEach(function(localeCode) {
                            var optionEl = document.createElement('option');
                            optionEl.value = localeCode;
                            optionEl.selected = localeCode == initialLocaleCode;
                            optionEl.innerText = localeCode;
                            localeSelectorEl.appendChild(optionEl);
                        });
                        localeSelectorEl.addEventListener('change', function() {
                            if (this.value) {
                                calendar.setOption('locale', this.value);
                            }
                        });
                        //Calendar Multi Language [End]
                },
                change: function(themeSystem) {
                    calendar.setOption('themeSystem', themeSystem);
                }
    });
        //Event Drop(Yer Değiştirme) [Start]
        function eventDrop(info){
            var selectedBridge = bridgesSelector.children("option:selected").val();//Köprülerin tarih-saat aralığını seçmek için global olan selector'ün alınması
            if(selectedBridge==null || selectedBridge=='Bridge Choose')
            {
                //edit(info.event);
                info.revert();
            }
            else{
                editBridge(info.event,renderedBridges);
            }
            calendar.render();
        }
        //Event Drop(Yer Değiştirme) [End]

        //Event Resize(Boyutunu Uzatma) [Start]
        function eventResize(info) {
            var selectedBridge = bridgesSelector.children("option:selected").val();//Köprülerin tarih-saat aralığını seçmek için global olan selector'ün alınması
            if(selectedBridge==null || selectedBridge=='Bridge Choose')
            {
               // edit(info.event);
                info.revert();
            }
            else
            {
                editBridge(info.event,renderedBridges);
            }
            calendar.render();
        }
        //Event Resize(Boyutunu Uzatma) [End]





        //Maintenance (Bakım) Türünün Toplanması [Start]
        function maintenanceTimeSum(maintenanceArray) {


            var totalHour='00';
            var totalMinute='00';
            var totalTime;
            totalHour=parseInt(totalHour);
            totalMinute=parseInt(totalMinute);
            $.each(addEventForm.find("input[name='maintenance[]']:checked"), function(){
                maintenanceArray.push($(this).val()); // Seçili Bakım Türünün Array'e Eklenmesi
                var item=$(this).val();
                var maintenanceHour = item.substr(1, 2);
                var maintenanceMinute = item.substr(4, 2);

                maintenanceMinute=parseInt(maintenanceMinute);
                maintenanceHour=parseInt(maintenanceHour);
                totalHour=totalHour+maintenanceHour;
                totalMinute=totalMinute+maintenanceMinute;
                if(totalMinute>=60)
                {
                    totalHour++;
                    totalMinute=0;
                }
            });


            if(totalMinute==0)
            {
                totalTime='0'+totalHour+':'+'0'+totalMinute;
            }
            else
            {
                totalTime='0'+totalHour+':'+totalMinute;
            }

            return moment(totalTime,"HH:mm:ss").format('HH:mm:ss');
        }
        //Maintenance (Bakım) Türünün Toplanması [End]

        //Seçilen Alanın Farkının Alınması Fonksiyonu [Start]
            function selectDiff(event){

                var saveStartTime;//Seçilen time'ın başlangıcı
                var saveEndTime;//Seçilen time'ın başlangıcı
                saveStartTime = moment(event.start).format('HH:mm');
                saveEndTime = moment(event.end).format('HH:mm');
                var ms = moment(saveEndTime, "HH:mm").diff(moment(saveStartTime, "HH:mm"));
                var d = moment.duration(ms);
                var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm");
                var timeDiff = '0' + s;
                timeDiffMoment = moment(timeDiff, 'HH:mm');//Seçilen aradaki dakika farkının alınması

            }
        //Seçilen Alanın Farkının Alınması Fonksiyonu [End]
        //Context Edit Function [Start]
            function contextEdit(event) {
                var selectedBridge = bridgesSelector.children("option:selected").val();//Köprülerin tarih-saat aralığını seçmek için global olan selector'ün alınması
                if(selectedBridge==null || selectedBridge=='Bridge Choose') {
                    $('#addEventForm').find("input[name='maintenance[]']:checked").prop('checked', false);
                    $('#addEventForm')[0].reset();
                    $('#ModalEdit #editId').val(event.id);

                    $.ajax({
                        url: '/dHome/userJoinAppointment',
                        type: 'get',
                        data: {
                            id: event.id
                        },
                        dataType: 'json',
                        success: function (data) {

                            try {
                                data.forEach(function (item) {

                                    $('#ModalEdit #licensePlateEdit').val(item['license_plate']);
                                    $('#ModalEdit #fullNameEdit').val(item['fullname']);
                                    $('#ModalEdit #emailEdit').val(item['email']);
                                    $('#ModalEdit #gsmEdit').val(item['gsm']);
                                    $('#ModalEdit #countryEdit option').each(function(){
                                        if(this.value==item['country'])
                                        {
                                            $(this).prop('selected','selected');
                                        }
                                    });
                                    $('#ModalEdit #langEdit option').each(function(){
                                        if(this.value==item['lang'])
                                        {
                                            $(this).prop('selected','selected');
                                        }
                                    });
                                    $('#ModalEdit #editStart').val(moment(event.start).format('YYYY-MM-DD HH:mm:ss'));
                                    $('#ModalEdit #editEnd').val(moment(event.end).format('YYYY-MM-DD HH:mm:ss'));
                                });
                            }
                            catch (e) {

                            }
                            $('#ModalEdit').modal('show');
                            $('#editEventSubmit').prop("disabled", false);
                        }
                    });






                }
                else
                {
                    $("#dialogEdit").dialog("open");
                    $( "#dialogAdd" ).dialog( "close" );
                    $( "#dialogDelete" ).dialog( "close" );
                }

            }
        //Context Edit Function [End]

        //Context Delete Function [Start]
            function contextDelete(event,locale,eventId) {

                var selectedBridge = bridgesSelector.children("option:selected").val();//Köprülerin tarih-saat aralığını seçmek için global olan selector'ün alınması
                if(selectedBridge==null || selectedBridge=='Bridge Choose') {
                    bootbox.confirm({
                            message: "Is event delete?",
                            size: 'small',
                            locale: locale,
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
                                if (result === true) {

                                    $.ajaxSetup({
                                        headers: {
                                            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                                        }
                                    });

                                    $.ajax({
                                        type: 'GET',
                                        url: '/dHome/destroyEvent/' + eventId,
                                        dataType: 'json',
                                        success: function (data) {
                                            $('#notificationAlert').addClass('alert-success').removeClass('alert-danger');
                                            $(".notification-text").html("Event deleted");
                                            $('#notificationAlert').show();
                                            event.remove();
                                            _.remove(appointmentData, function(n) {
                                                return n.id == eventId;

                                            });
                                        }
                                    });

                                } else {
                                    $(".notification-text").html("Event not deleted");
                                    $('#notificationAlert').addClass('alert-danger').removeClass('alert-success');
                                    $('#notificationAlert').show();
                                }
                            }
                        }
                    );
                }
                else
                {
                    $('#bridgeDatetimeDeleteForm').find('#bridgeDatetimeId').attr('value',eventId);
                    $('#bridgeDatetimeDelete').html(moment(event.start).format('YYYY.MM.DD HH:mm:ss') +" - "+moment(event.end).format('YYYY.MM.DD HH:mm:ss') );
                    $("#dialogBridgeDatetimeDelete").dialog("open");
                    $( "#dialogAdd" ).dialog( "close" );
                    $( "#dialogEdit" ).dialog( "close" );
                }

            }
        //Context Delete Function [End]

        //Bridge DateTime Ekleme Fonkdsiyonu(Ajax) [Start]
            function bridgeDateTime(selectedBridge,event,bridgeName,bridgeId) {

            bootbox.confirm({
                message: "Do you want to add an bridge datetime",
                size: 'small',
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
                    if (result === true) {
                        console.log(bridgeId)


                        $.ajaxSetup({
                            headers: {
                                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')

                            }
                        });

                        $.ajax({
                            url: '/addBridgeDateTime',
                            type: 'post',
                            data: {
                                bridge_name:bridgeName,
                                bridge_id:bridgeId,
                                start: moment(event.start).format('YYYY-MM-DD HH:mm:ss'),
                                end: moment(event.end).format('YYYY-MM-DD HH:mm:ss'),
                            },
                            dataType: 'json',
                            success: function (data) {

                                calendar.addEvent(
                                    {
                                        id: data['id'],
                                        title: data['bridge_name'] ,
                                        start: data['start'],
                                        end: data['end'],
                                        backgroundColor: 'blue !important',
                                        borderColor: 'blue !important',

                                    });
                                console.log('------------')
                                renderedBridges.push({
                                     id:data['id'],
                                    title: data['bridge_name'] ,
                                    start: data['start'],
                                    end: data['end'],
                                    rendering: 'background',
                                    className: 'fc-nonbusiness',

                                });
                                console.log(renderedBridges)
                                $(".notification-text").html("Bridge History Added");
                                $('#notificationAlert').addClass('alert-success').removeClass('alert-danger');
                                $('#notificationAlert').show();

                            }
                            ,
                            error: function () {
                                $(".notification-text").html("Bridge History not Added");
                                $('#notificationAlert').addClass('alert-danger').removeClass('alert-success');
                                $('#notificationAlert').show();
                            }
                        });


                    }


                    else {
                        $(".notification-text").html("Bridge History not added");
                        $('#notificationAlert').addClass('alert-danger').removeClass('alert-success');
                        $('#notificationAlert').show();
                    }

                }

            });


        }
        //Bridge DateTime Ekleme Fonksiyonu(Ajax) [End]

        //Appointment(Randevu) Güncellenmesi [Start]
        var editEventForm = $('#editEventForm');
        editEventForm.submit(function(e){
            //  $('#editEventSubmit').prop( "disabled", true );
            e.preventDefault();
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                }
            });
            $.ajax({
                type: 'POST',
                url: '/dHome/editEvent',
                dataType:"json",
                data: editEventForm.serialize() ,
                success:function (data) {
                    if(data.errorEdit)
                    {
                        $(".notification-text").html("Appointment not edited ");
                        $('#notificationAlert').addClass('alert-danger').removeClass('alert-success');
                    }
                    else {
                        var event = calendar.getEventById(data.id);
                        event.remove();
                        $('#ModalEdit').modal('hide');
                        calendar.addEvent(
                            {
                                id: data.id,
                                title:data.title,
                                start: data.start,
                                end: data.end
                            });
                        $(".notification-text").html("Appointment edited");
                        $('#notificationAlert').addClass('alert-success').removeClass('alert-danger');
                    }
                    $('#notificationAlert').show();
                }
            });
        });
        //Appointment(Randevu) Güncellenmesi [End]

        //Randevu Eklenmesi İçin Kullanılan Submit Burda Veriler Array'e Alınır
        //Appointment(Randevu) Eklenmesi [Start]
        var globalTotalTime;
        var addEventForm = $('#addEventForm');
        addEventForm.submit(function(e){
            e.preventDefault();
            var maintenanceArray= [];
            addEventData=[];
            addEventData.push(addEventForm.find('#licensePlate').val());
            addEventData.push(addEventForm.find('#fullName').val());
            addEventData.push(addEventForm.find('#email').val());
            addEventData.push(addEventForm.find('#gsm').val());
            addEventData.push(addEventForm.find('#country').val());
            addEventData.push(addEventForm.find('#lang').val());

            //Bakım Türü Dakikalarının Toplanması Start
            globalTotalTime=maintenanceTimeSum(maintenanceArray);
            //Bakım Türünün Dakikasının Toplanması End
            console.log(globalTotalTime)
            calendar.setOption('slotDuration',globalTotalTime);//Time Grid Aralığının Belirlenmesi
            calendar.setOption('selectable',true);
            addEventData.push({maintenance:maintenanceArray});//Dataya Bakım Türünün Eklenmesi
            addEventForm.trigger("reset");//Formun Resetlenmesi

            calendar.removeAllEvents();
            appointmentData.forEach(function(items){
                items['rendering']='background';
                items['className']='context-menu-one context-class event-dark ';
            });
            calendar.addEventSource(appointmentData);
            calendar.addEventSource(renderedBridges);
            calendar.render();


            $('#ModalAdd').modal('hide');


            //Mouse with popup
            $(document).mousemove(function(e){
                $("#mousepopup").css({left:(e.pageX+20) + "px", top:(e.pageY+20) + "px"});
                $('#mousepopup').html(addEventData[0]+'  '+addEventData[1]+' '+addEventData[4]);

            });
            $('#mousepopup').show();




        });
        //Appointment(Randevu) Eklenmesi [End]

        //Randevu Ekleme Fonksiyonu(Ajax) [Start]
            function selectAddAppointment(event,addEventData) {
                        var start=moment(event.start).format('YYYY-MM-DD HH:mm:ss');
                        var end =moment(event.end).format('YYYY-MM-DD HH:mm:ss');
                        var licensePlate=addEventData[0];
                        var fullName=addEventData[1];
                        var email=addEventData[2];
                        var gsm=addEventData[3];
                        var country=addEventData[4];
                        var lang=addEventData[5];
                        var maintenance=addEventData[6]['maintenance'];
                        console.log(maintenance)

                        $.ajaxSetup({
                            headers: {
                                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')

                            }
                        });

                        $.ajax({
                            url: '/addSelectAppoinment',
                            type: 'post',
                            data: {
                                start:start,
                                end:end,
                                licensePlate:licensePlate,
                                fullName:fullName,
                                email:email,
                                gsm:gsm,
                                country:country,
                                lang:lang,
                                maintenance:maintenance,

                            },
                            dataType: 'json',
                            success: function (data) {
                                if(data['errorBridge'])
                                {
                                    $(".notification-text").html("There is no bridge in this area. Please select another area");
                                    $('#notificationAlert').addClass('alert-danger').removeClass('alert-success');
                                    $('#notificationAlert').show();
                                }
                                else if(data['errorUser'])
                                {
                                    $(".notification-text").html("There is this user. Please,you add dataset repeat");
                                    $('#notificationAlert').addClass('alert-danger').removeClass('alert-success');
                                    $('#notificationAlert').show();
                                }
                                else {

                                    appointmentData.push(data);

                                    calendar.addEvent(
                                        {
                                            id: data['id'],
                                            title: data['title'],
                                            start: data['start'],
                                            end: data['newTime'],
                                         /*   backgroundColor: 'blue !important',
                                            borderColor: 'blue !important',*/
                                            className: 'context-menu-one context-class event-dark',
                                          /*  rendering: 'background'*/

                                        });




                                    calendar.removeAllEvents();
                                    appointmentData.forEach(function(items){
                                        items['rendering']='';
                                        items['className']='context-menu-one context-class ';
                                    });
                                    calendar.addEventSource(appointmentData);
                                    calendar.addEventSource(renderedBridges);
                                    calendar.setOption('selectable',false);
                                    calendar.setOption('slotDuration','00:30');
                                    calendar.render();


                                    $('#mousepopup').effect("shake", function(){$(this).hide()});
                                    $(".notification-text").html("Bridge History Added");
                                    $('#notificationAlert').addClass('alert-success').removeClass('alert-danger');
                                    $('#notificationAlert').show();
                                }
                            }
                            ,
                            error: function () {
                                $(".notification-text").html("Bridge History not Added");
                                $('#notificationAlert').addClass('alert-danger').removeClass('alert-success');
                                $('#notificationAlert').show();
                            }
                        });


            }
        //Randevu Ekleme Fonksiyonu(Ajax) [End]

        //Event'e Tıklandığında Bakım türü ve Randevu'nun Join Edilmesi Fonksiyonu [Start]
            function clickEventJoinMaintenance(info) {

                $.ajax({
                    url: '/dHome/getEventsJoinMaintenance',
                    type: 'get',
                    data: {
                        id: info.event.id
                    },
                    dataType: 'json',
                    success: function (data) {
                        var title = info.event.title;
                        var message = 'Maintenance Title: ' + data.maintenanceTitle + '<br>Maintenance Minute: ' + data.maintenanceMinute;
                        if (data.joinError) {
                            title = 'Maintenance not found';
                            message = 'No maintenance type assigned';
                        } else {
                            title = info.event.title;
                            message = 'Full Name: '+data.fullname+'<br>' +
                                ' Country: '+data.country+'<br>' +
                                ' Lang: '+data.lang+'<br>' +
                                'GSM: '+data.gsm+'<br>' +
                                'E Mail: '+data.email+'<br>' +
                                'Maintenance Title: ' + data.maintenanceTitle + '<br>' +
                                'Maintenance Minute: ' + data.maintenanceMinute;

                        }

                        bootbox.alert({
                            title: title,
                            message: message,
                            size: 'small',
                            callback: function (result) {

                            }
                        });

                    }
                });

            }
        //Event'e Tıklandığında Bakım türü ve Randevu'nun Join Edilmesi Fonksiyonu [End]

        //Bridge'ler Üzerine Tıklandığında Select İşleminin Yapılması Fonksiyonu [Start]
            function selectAllowBridge(selectInfo,bool) {
                for(var i=0;i<renderedBridges.length;i++) {
                    if (moment(selectInfo.start) >= moment(renderedBridges[i]['start']) && moment(selectInfo.end) <= moment(renderedBridges[i]['end'])) {
                        console.log('Seçilen Start: ' + selectInfo.start + ' | Event Start: ' + renderedBridges[i]['start'])
                        console.log('Seçilen End: ' + selectInfo.end + ' | Event End: ' + renderedBridges[i]['end'])
                        bool.push(true);

                    } else {
                        bool.push(false);

                    }


                }
                var findBool= _.find(bool,function (o) {
                    return o===true;
                });
                if(undefined !==findBool){
                    return true;
                }
                else {
                    //alert('Müsait Değil');
                    return false;
                }



            }
        //Bridge'ler Üzerine Tıklandığında Select İşleminin Yapılması Fonksiyonu [End]

        //Bridge Event'inin Silinmesi Konusunda Dialog Kurulması [Start]
        $( "#dialogBridgeDatetimeDelete" ).dialog({
            position: {
                my: "center",
                at: "center",
                of: window
            },
            autoOpen: false,
            title: "Bridge Delete",
            height: 200,
            closeText: "",
        }).prev(".ui-dialog-titlebar").attr("style","background-color:#e22620 !important;border-color:#e22620 !important;");
        //Bridge Event'inin Silinmesi Konusunda Dialog Kurulması [End]

        //Bridge Select and Render [Start]
            bridgesSelector.on('change',function(){
                var selectedBridge = $(this).children("option:selected"). val();
                var selectedBridgeId = $(this).children("option:selected").data('id');
                if(selectedBridge==null || selectedBridge=="Bridge Choose")
                {

                    $.ajax({

                        url: '/dHome/getEvent?_token=0GTwvcp5NWn7zBVtu6lSH4R5GhTRLaCYDoJvnqNT',
                        type:'get',
                        success:function (rawData) {
                            calendar.removeAllEvents();
                            rawData.forEach(function(items){
                                items['className']='context-menu-one context-class event-dark ';
                            });
                            calendar.addEventSource(rawData);
                            calendar.addEventSource(renderedBridges);
                            calendar.setOption('selectable',false);
                            calendar.render();
                            $('.fc-custom-button').show();
                            $('.fc-custom2-button').show();
                            $('#newAppointment').show();
                        },
                        error: function() {
                            alert('There was an error while fetching events.');
                        }
                    });

                }
                else
                {

                    $.ajax({

                        url: '/dHome/getBridgeDateTime',
                        type:'get',
                        success:function (rawData) {
                            var filteredData=_.filter(rawData, function(o) { return o.title==selectedBridge; }); //Lodash kütüphanesi ile filtreliyoruz.
                            calendar.removeAllEvents();

                            calendar.addEventSource(filteredData);
                            calendar.setOption('selectable',true);
                            calendar.setOption('slotDuration','00:30');//Time Grid Aralığının Belirlenmesi
                            calendar.render();
                            $('.fc-custom-button').hide();
                            $('.fc-custom2-button').hide();
                            $('#newAppointment').hide();
                        },
                        error: function() {
                            alert('There was an error while fetching events.');
                        }
                    });
                }


            });
        //Bridge Select and Render [End]

        // Next Onclick Render [Start]
             $('.fc-next-button span').on('click',function () {//İleri Butonu ile render etme işlemi

                // calendar.addEventSource(renderedBridges);
                 console.log(renderedBridgesData);
                 calendar.render();

        });
        // Next Onclick Render [End]

        //Prev Onclick Render [Start]
             $('.fc-prev-button span').on('click',function () {//Geri Butonu ile render etme işlemi

                // calendar.addEventSource(renderedBridges);
                 console.log(renderedBridgesData);
                 calendar.render();
        });
        //Prev Onclick Render [End]

        //Context Menu [Start]
              $.contextMenu({
                    selector: '.context-menu-one',
                    delegate: ".hasmenu",
                    preventContextMenuForPopup: true,
                    preventSelect: true,
                    callback: function(key, options) {
                        var locale = $('#locale-selector').val();
                        var eventId=$(this).attr('id');
                        var event = calendar.getEventById(eventId);
                        switch (key) {
                            case 'edit':
                                contextEdit(event);
                                break;
                            case 'delete':
                                contextDelete(event,locale,eventId);
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
              });
        //Context Menu [End]

        //Bridge Click [Start]
        function clickBridge(info){
            console.log(info.event.id)

            var appointmentInBridge=$('#clickBridgeForm').find('table').find('tbody');

             $.ajax({
                url: '/dHome/bridgeJoinAppointment',
                type: 'get',
                data: {
                    id: info.event.id
                },
                dataType: 'json',
                success: function (data) {
                   var bridgeHtml;
                    var index=1;
                        try {
                            data.forEach(function (item) {
                                bridgeHtml +=' <tr><th scope="row">'+index+'</th><td>'+item['license_plate']+'</td><td>'+item["fullname"]+'</td><td>'+item["country"]+'</td><td>'+item["lang"]+'</td><td>'+item["gsm"]+'</td><td>'+item["email"]+'</td></tr>';
                                 index++;
                            });
                            appointmentInBridge.html(bridgeHtml);
                        }
                        catch (e) {
                            appointmentInBridge.append(' <tr><th scope="row"> Appointment not in this bridge </th>');
                        }


                 $('#ModalInBridge').modal('show');
                }
            });
        }
        //Bridge Click [End]


});

