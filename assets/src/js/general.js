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


        $('.js-nav-open').click(function () {
            $(this).toggleClass('active');
            $('.js-header-nav').toggleClass('active');
        });

        $('.js-principles-popup-opener').click(function () {
            let index = $(this).attr('data-index');
            $('.js-principles-popup').addClass('--active');
            $('.js-principles-popup-nav button, .js-principles-popup-container').removeClass('--active');
            $('.js-principles-popup-nav button[data-index="' + index + '"]').addClass('--active');
            $('.js-principles-popup-container[data-index="' + index + '"]').addClass('--active');
        });

        $('.js-principles-popup-nav button').click(function () {
            let index = $(this).attr('data-index');
            $('.js-principles-popup-nav button, .js-principles-popup-container').removeClass('--active');
            $('.js-principles-popup-nav button[data-index="' + index + '"]').addClass('--active');
            $('.js-principles-popup-container[data-index="' + index + '"]').addClass('--active');
        });

        $('.js-principles-popup-close').click(function () {
            $('.js-principles-popup').removeClass('--active');
        });



    });
});