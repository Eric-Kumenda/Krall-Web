  const swiperBlog = new Swiper('#blogSlider', {
    slidesPerView: 1,
    spaceBetween: 24,
    navigation: {
      nextEl: '#nextBlog',
      prevEl: '#prevBlog',
    },
    scrollbar: {
      el: '#swiper-scrollbar-blog',
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
    },
  });
 document.addEventListener('DOMContentLoaded', function () {
    new Swiper('#valuesSlider', {
      slidesPerView: 'auto',
      spaceBetween: 24,
      loop: true,
      navigation: {
        prevEl: '#prev-values',
        nextEl: '#next-values'
      },
      scrollbar: {
        el: '.swiper-scrollbar-values',
      }
    });
  });

document.addEventListener('DOMContentLoaded', function () {
    new Swiper('#positionsSlider', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      navigation: {
        prevEl: '#prev-positions',
        nextEl: '#next-positions'
      },
      breakpoints: {
        500: {
          slidesPerView: 2
        },
        800: {
          slidesPerView: 3
        },
        1080: {
          slidesPerView: 4
        }
      }
    });
  });

// Testimonials
document.addEventListener('DOMContentLoaded', function () { 
	new Swiper('#testimonialSwiper', {
    slidesPerView: 'auto',
    spaceBetween: 24,
      loop: true,
    //mousewheel: true,
    //grabCursor: true,
    navigation: {
      nextEl: '#next-testimonials',
      prevEl: '#prev-testimonials',
    },
	breakpoints: {
        500: {
          slidesPerView: 2
        },
        800: {
          slidesPerView: 3
        },
        1080: {
          slidesPerView: 4
        }
      }
  });
})