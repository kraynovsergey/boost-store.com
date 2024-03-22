// Скрипты главного слайдера
$(document).ready(function () {
    const reviews_swiper = new Swiper('.swiper-reviews', {
        slidesPerView: 1,
        spaceBetween: 30,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1
            },
            768: {
                slidesPerView: 2
            },
            960: {
                slidesPerView: 3
            },
        }
        // autoplay: {
        //     delay: 5000,
        // },
    });
})