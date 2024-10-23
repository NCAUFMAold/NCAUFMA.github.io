// Inicializa o Swiper.js
document.addEventListener('DOMContentLoaded', function () {
  var swiper = new Swiper('.swiper-container', {
    loop: true, // Loop infinito
    autoplay: {
      delay: 8000, // Autoplay com 8 segundos de intervalo
    },
    pagination: {
      el: '.swiper-pagination', // Bolinhas de navegação
      clickable: true, // Permite clicar nas bolinhas
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
    },
  });
});
