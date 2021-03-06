
$(document).ready(function () {
// Register Main
// Form'u odaklamak için tıklanan inputlara göre diğer tarafların flu olmasını sağlar.
// Form Blur Start

            var nameAlert=$('#name-alert');
            var emailAlert=$('#email-alert');
            var passwordAlert=$('#password-alert');
            $('input,#password-show').focus(function(){

                $("nav").css("-webkit-filter", "blur(3px)");
                $("#image").css("-webkit-filter", "blur(3px)");
                $("form").css("-webkit-filter", "blur(0px)");
                nameAlert.hide();
                emailAlert.hide();
                passwordAlert.hide();

            }).blur(function () {

                $("nav").css("-webkit-filter", "blur(0px)");
                $("#image").css("-webkit-filter", "blur(0px)");
                $("form").css("-webkit-filter", "blur(0px)");
            });

// Form Blur End


/// LABEL SHOW-HİDE ANİMASYONU
// LABEL SHOW-HİDE ANİMASYONU START

            var name=$('#name');
            var nameLabel=$('#name-label');
            name.focus(function() {

                nameLabel.show('fast').animate({top: '-25px'});
            }).blur(function () {
                nameLabel.animate({top: '0px'}).hide('fast');
            });

            var email =$('#email');
            var emailLabel = $('#email-label');
            email.focus(function() {

                emailLabel.show('fast').animate({top: '60px'});
            }).blur(function () {
                emailLabel.animate({top: '80px'}).hide('fast');
            });

            var countrySelector= $('#country_selector');
            var countryLabel=$('#country-label');
            countrySelector.focus(function() {

                countryLabel.show('fast').animate({top: '140px'});
            }).blur(function () {
                countryLabel.animate({top: '170px'}).hide('fast');
            });
            var lang= $('#lang');
            var langLabel=$('#lang-label');
            lang.focus(function() {

                langLabel.show('fast').animate({top: '220px'});
            }).blur(function () {
                langLabel.animate({top: '250px'}).hide('fast');
            });

            var password =  $('#password');
            var passwordLabel = $('#password-label');
            password.focus(function() {

                passwordLabel.show('fast').animate({top: '310px'});
            }).blur(function () {
                passwordLabel.animate({top: '340px'}).hide('fast');
            });

            var passwordConfirmation =  $('#password_confirmation');
            var passwordConfirmationLabel = $('#password-confirmation-label');
            passwordConfirmation.focus(function() {

                passwordConfirmationLabel.show('fast').animate({top: '390px'});
            }).blur(function () {
                passwordConfirmationLabel.animate({top: '420px'}).hide('fast');
            });

 //  LABEL SHOW-HİDE ANİMASYONU END





// Password'ün gösterilmesi ve gizlenmesi işlemi
// Password Show Hide Start

            var show_hide_password = $("#show_hide_password") ;
            var showHidePasswordInput = show_hide_password.find('input');
            var showHidePasswordI = show_hide_password.find('i');
            show_hide_password.find('a').on('click', function(event) {
                event.preventDefault();

                if(showHidePasswordInput.attr("type") === "text"){
                    showHidePasswordInput.attr('type', 'password');
                    showHidePasswordI.addClass( "fa-eye-slash" ).removeClass( "fa-eye" );
                }
                else if(showHidePasswordInput.attr("type") === "password"){
                    showHidePasswordInput.attr('type', 'text');
                    showHidePasswordI.removeClass( "fa-eye-slash" );
                    showHidePasswordI.addClass( "fa-eye" );
                }
            });
            var show_hide_password2 = $("#show_hide_password2") ;
            var showHidePasswordInput2 = show_hide_password2.find('input');
            var showHidePasswordI2 = show_hide_password2.find('i');
            show_hide_password2.find('a').on('click', function(event) {
                event.preventDefault();

                if(showHidePasswordInput2.attr("type") === "text"){
                    showHidePasswordInput2.attr('type', 'password');
                    showHidePasswordI2.addClass( "fa-eye-slash" ).removeClass( "fa-eye" );
                }
                else if(showHidePasswordInput2.attr("type") === "password"){
                    showHidePasswordInput2.attr('type', 'text');
                    showHidePasswordI2.removeClass( "fa-eye-slash" );
                    showHidePasswordI2.addClass( "fa-eye" );
                }
            });

// Password Show Hide End

// Email için canlı doğrulama işlemi için
// Email Doğrulama Start

            var email=$('#email');
            email.on('keyup',function () {
                var emailValue = $(this).val();
                var filter = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                if(filter.test(emailValue))
                {
                    email.addClass( "is-valid" );
                    email.removeClass( "is-invalid" );
                }
                else{
                    email.addClass( "is-invalid" );
                    email.removeClass( "is-valid" );
                }

            }) ;

// Email Doğrulama End


// Password için güvenlik doğrulaması
// Password Güvenlik Start


            $('#password , #password_confirmation').on('keyup',function () {
                var passwordLength=$(this).val().length;
                var password=$('#password').val();
                var password_confirmation=$('#password_confirmation').val();
                var passwordEqual=$('#password_equal');
                if(passwordLength>6)
                {

                    $(this).addClass('is-valid').removeClass('is-invalid');
                    if(password==password_confirmation)
                    {
                        passwordEqual.show('slow');

                    }
                    else
                    {
                        passwordEqual.hide('slow');

                    }
                }
                else
                {
                    $(this).addClass('is-invalid').removeClass('is-valid');
                }



            }) ;

// Password Güvenlik End


// Hata Mesajı Start

            var errorHide=$('#errorHide');
            var errorAlert=$('#errorAlert');
            errorHide.on('click',function () {
                errorAlert.animate({left:'1500px'}).hide('slow');
            });

// Hata Mesajı End


// Notification Start

            var notificationHide=$('#notificationHide');
            var notificationAlert=$('#notificationAlert');
            notificationHide.on('click',function () {
                notificationAlert.animate({left:'1500px'}).hide('slow');
            });

// Notification End

});


// Ülke seçimi selector default
// Ülke seçimi Start

            $("#country_selector").countrySelect({
                preferredCountries: ['tr', 'nl', 'de']
            });

// Ülke seçimi End

