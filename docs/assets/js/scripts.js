$(document).ready(function () {
  var navbar = $('#navbarTop');

  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      navbar.removeClass('bg-md-transparent').addClass('bg-dark');
    } else {
      navbar.removeClass('bg-dark').addClass('bg-md-transparent');
    }
  });
});