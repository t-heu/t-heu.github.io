const ope = document.getElementById("open-menu");
const clo = document.getElementById("close-menu");

$('.menu-nav').on('click', () => {
  var x = document.getElementById("nav_a");
  if (x.style.display === "block") {
    ope.style.display = "block";
    clo.style.display = "none";
  } else {
    ope.style.display = "none";
    clo.style.display = "block";
  }
  $('.nav').addClass().slideToggle('slow');
});