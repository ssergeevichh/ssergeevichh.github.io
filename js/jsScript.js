
$(document).ready(function () {
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: false,
        prevArrow: '<button type="button" class="slick-prev"><img src="../icons/leftMove.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../icons/rightMove.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    });
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog__meaning').eq(i).toggleClass('catalog__meaning_active');
                $('.catalog__list').eq(i).toggleClass('catalog__list_active');

            });
        });
    }
    toggleSlide('.catalog__link');
    toggleSlide('.catalog__back');

    // Modal

    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn();
    });
    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });

    $('.button_buy').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text($('.catalog__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn();
        });
    });
    function formValidate(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя!",
                    minlength: jQuery.validator.format("Минимальное количество символов: {0}")
                },
                phone: "Пожалуйста, введите свой номер телефона!",
                email: {
                    required: "Пожалуйста, введите свою почту!",
                    email: "Неверно введен почтовый адрес!"
                }
            }
        });
    }
    formValidate('#consultation form');
    formValidate('#consultation-form');
    formValidate('#order form');

    $('input[name=phone]').inputmask({ "mask": "+38(999) 999-9999" });

    $('form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            $('#consultation,#order').fadeOut();
            $('overlay,#thanks').fadeIn();
            $('form').trigger('reset');
        });
        return false;
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() > 700) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });
    $("a[href^='#']").click(function () {
        const _href = $(this).attr("href");
        $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
        return false;
    });
    new WOW().init();
});
