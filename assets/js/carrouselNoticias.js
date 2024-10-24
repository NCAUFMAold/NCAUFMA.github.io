document.addEventListener('DOMContentLoaded', function () {
  var swiper = new Swiper('.swiper-container', {
    loop: true,
    autoplay: {
      delay: 8000,
      disableOnInteraction: false, 
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    touchRatio: 1,
    simulateTouch: true,
    grabCursor: true,
    // Sem breakpoints, para verificar se há interferência
  });
});
