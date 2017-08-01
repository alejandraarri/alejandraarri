/*!
 * =======================================================
 *
 ********************* Alejandra Arri *********************
 *
 *
 * This website was designed and created by Alejandra Arri.
 * ========================================================
 */
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - $('nav').height()
        }, 1000);
        console.log(target, target.offset().top, $('nav').height());
        return false;
      }
    }

  });
});

$(document).ready(function(){
    $(window).bind('scroll', function() {
        var navHeight = $( window ).height();
        if ($(window).scrollTop() > navHeight) {
            $('nav').addClass('navbar--fixed');
        } else {
            $('nav').removeClass('navbar--fixed');
        }
    });

    $('#back-button').click(function(e){
        $("#contact__feedback").hide();
        $("#back-button").hide();
        $("#contact__main-form").show();
    });

    $('#send-button').click(function(e){
      $.ajax({
          data: {"name" : $("#name").val(), "email" : $("#email").val(), "message": $("#message").val()},
          type: "POST",
          dataType: "json",
          url: "php/contact-form-handler.php"
      })
      .done(function( data, textStatus, jqXHR ) {
          $("#contact__main-form").hide();
          $("#contact__feedback").show();
          if (data && data.length != 0 ){
              $("#final-message").html(data[0].statusText);
              if (data[0].status != "00" ){
                  $("#back-button").show();
              }
          }
      })
      .fail(function( jqXHR, textStatus, errorThrown ) {
          if ( console && console.log ) {
              console.error( "La solicitud a fallado: " +  textStatus);
          }
      });
    });
});
