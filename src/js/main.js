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
           }
           else {
               $('nav').removeClass('navbar--fixed');
           }
      });
  });
