$(document).ready(function () {
    $(".toggle-menu").click(function () {
        $(this).toggleClass("active");
        $("#menu").toggleClass("open");
      });
      $("#menu ul a").click(function () {
        $(".toggle-menu").removeClass("active");
        $("#menu").removeClass("open");
      });

});