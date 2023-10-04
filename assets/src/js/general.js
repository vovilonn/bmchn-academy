jQuery(function ($) {
    $(document).ready(function () {

        $('.js-page-nav li a').click(function (e) {
           e.preventDefault();
            let index = $(this).attr('data-page-nav-index');
            $('.js-page-nav-popup').addClass('--active');
            $('.js-page-nav-popup .js-page-nav-inner[data-page-nav-index="'+ index +'"]').addClass('--active');
        });
        $('.js-page-nav-popup .js-close').click(function (){
            $('.js-page-nav-popup, .js-page-nav-inner').removeClass('--active');
        })

        $("video[autoplay]").each(function(){ this.play(); });

        if (innerWidth > 1024) {
            let mainSlider = new Swiper('.main-slider .swiper-container', {
                direction: 'vertical',
                mousewheel: true,
                slidesPerView: 1,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                on: {
                    slideChange: function () {
                        const index_currentSlide = this.realIndex;
                        $('.js-main-slider-tabs li button').removeClass('active');
                        $('.js-main-slider-tabs li button[data-slide-index=' + (index_currentSlide + 1) + ']').addClass('active');
                    },
                },
            });

            $('.js-main-slider-tabs li button').click(function () {
                let index = $(this).attr('data-slide-index');
                $('.js-main-slider-tabs li button').removeClass('active');
                $(this).addClass('active');
                $('.main-slider .swiper-pagination-bullet:nth-child(' + index + ')').click();
            });
        }

        $('.js-nav-open').click(function () {
            $(this).toggleClass('active');
            $('.js-header-nav').toggleClass('active');
        });

        $('.js-services-popup-opener').click(function () {
            let index = $(this).attr('data-tab-index');
            $('.js-services-popup').addClass('active');
            $('.js-services-popup-nav button, .js-services-popup-container').removeClass('active');
            $('.js-services-popup-nav button[data-tab-index="' + index + '"]').addClass('active');
            $('.js-services-popup-container[data-tab-index="' + index + '"]').addClass('active');
        });

        $('.js-services-popup-nav button').click(function () {
            let index = $(this).attr('data-tab-index');
            $('.js-services-popup-nav button, .js-services-popup-container').removeClass('active');
            $('.js-services-popup-nav button[data-tab-index="' + index + '"]').addClass('active');
            $('.js-services-popup-container[data-tab-index="' + index + '"]').addClass('active');
        });

        $('.js-services-popup-close').click(function () {
            $('.js-services-popup').removeClass('active');
        });

        $('.js-store-tabs button').click(function () {
            let index = $(this).attr('data-store-slider-index');
            $('.js-store-tabs button, .js-store-slider').removeClass('active');
            $('.js-store-slider[data-store-slider-index="' + index + '"]').addClass('active');
            $('.js-store-tabs button[data-store-slider-index="' + index + '"]').addClass('active');
        });

        let storeSliders = $('.js-store-slider');

        if (storeSliders.length) {
            storeSliders.each(function () {
                let index = $(this).attr('data-store-slider-index');
                let storeSlider = new Swiper('.js-store-slider[data-store-slider-index="' + index + '"] .swiper-container', {
                    direction: 'horizontal',
                    mousewheel: false,
                    slidesPerView: 1.8,
                    spaceBetween: 12,
                    pagination: false,
                    navigation: {
                        nextEl: '.js-store-slider[data-store-slider-index="' + index + '"] .js-store-slider-next',
                        prevEl: '.js-store-slider[data-store-slider-index="' + index + '"] .js-store-slider-prev'
                    },
                    breakpoints: {
                        768: {
                            slidesPerView: 4,
                        }
                    },
                });
            });
        }

        let teamSlider = new Swiper('.js-team-slider .swiper-container', {
            direction: 'horizontal',
            mousewheel: false,
            slidesPerView: 1.1,
            spaceBetween: 12,
            pagination: false,
            navigation: {
                nextEl: '.js-team-slider-next',
                prevEl: '.js-team-slider-prev'
            },
            breakpoints: {
                768: {
                    slidesPerView: 3,
                }
            },
        });

        $(window).on('scroll', function () {
            let st = $(window).scrollTop();
            let section = $('.biomachine-future')
            let sectionST = section.offset().top;
            let sectionHeight = section.height();
            let windowHeight = $(window).height();
            let point = (sectionST + sectionHeight) - windowHeight;

            if (st >= point) {
                $('.footer').addClass('--visible');
                $('.biomachine-string__bg').addClass('--visible');
                $('.js-page-nav').addClass('--hidden');
            } else {
                $('.biomachine-string__bg').removeClass('--visible');
                $('.footer').removeClass('--visible');
                $('.js-page-nav').removeClass('--hidden');
            }
        });

        $(window).on('scroll', function () {
            let st = $(window).scrollTop();
            let section = $('.js-store-section')
            let sectionST = section.offset().top;
            let point = sectionST - 400;

            if (st >= point) {
                section.removeClass('--inverted');
                $('.biomachine-promo.--last').addClass('--inverted');
            } else {
                section.addClass('--inverted');
                $('.biomachine-promo.--last').removeClass('--inverted');
            }
        });


        $('.biomachine-string__item').each(function () {
            let item = this;

            $(window).on('scroll', function () {
                let height = $(window).height();
                height = height - 150;
                let viewportOffset = item.getBoundingClientRect();
                let top = viewportOffset.top - height;
                if ((top + 150) <= 0 && (top + 150) >= -Math.abs(height / 2)) {
                    let percent = (top * 100) / height;
                    percent = +Math.abs(percent);
                    percent = Math.round(percent);

                    let value = 0;
                    value = percent * 2;
                    $(item).css('opacity', value / 100);

                    if (percent >= 40) {
                        $(item).removeClass('--opacity');
                    }
                }

                if ((top + 150) <= -Math.abs(height / 2) && (top + 150) >= -Math.abs(height)) {
                    let percent = (top * 100) / height;
                    percent = +Math.abs(percent);
                    percent = Math.round(percent);
                    let value = 0;

                    if (percent >= 50 && percent < 55) {
                        value = 0.9;
                    } else if (percent >= 55 && percent < 60) {
                        value = 0.8;
                    } else if (percent >= 60 && percent < 65) {
                        value = 0.7;
                    } else if (percent >= 65 && percent < 70) {
                        value = 0.6;
                    } else if (percent >= 70 && percent < 75) {
                        value = 0.5;
                    } else if (percent >= 75 && percent < 80) {
                        value = 0.4;
                    } else if (percent >= 80 && percent < 85) {
                        value = 0.3;
                    } else if (percent >= 85 && percent < 90) {
                        value = 0.2;
                    } else if (percent >= 90 && percent < 95) {
                        value = 0.1;
                    } else if (percent >= 90 && percent < 100) {
                        value = 0;
                    }

                    if ($(item).hasClass('--last')) {
                        $('.biomachine-string__bg').css('opacity', value);
                    }

                    $(item).css('opacity', value);
                }
            });
        })

    });
});