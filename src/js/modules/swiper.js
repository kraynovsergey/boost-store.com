import Swiper from 'swiper';
import { Navigation, Thumbs } from 'swiper/modules';

const swiper_gallery = document.querySelector('[data-swiper-gallery]');
const swiper_gallery_thumbs = document.querySelector('[data-swiper-gallery-thumbs]');

if (swiper_gallery) {
    const gallery_thumbs = new Swiper(swiper_gallery_thumbs, {
        modules: [Navigation],
        speed: 1000,
        navigation: {
            nextEl: '[data-swiper-gallery-thumbs-next]',
            prevEl: '[data-swiper-gallery-thumbs-prev]',
        },
        breakpoints: {
            0: {
                slidesPerView: 3,
                spaceBetween: 5
            },
            576: {
                slidesPerView: 4,
                spaceBetween: 10
            },
            768: {
                spaceBetween: 20,
                slidesPerView: 6,
            }
        }
    });

    const gallery = new Swiper(swiper_gallery, {
        modules: [Thumbs],
        speed: 2000,
        spaceBetween: 0,
        thumbs: {
            swiper: gallery_thumbs
        }
    });
}

const swiper_together = document.querySelector('[data-swiper-together]');
if (swiper_together) {
    new Swiper(swiper_together, {
        speed: 2000,
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            576: {
                slidesPerView: 2,
                spaceBetween: 10
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            1280: {
                slidesPerView: 4,
                spaceBetween: 20
            }
        }
    });
}