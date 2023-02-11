$(document).ready(function() {
    const slider = tns({
        container: '.carousel__inner',
        items: 1,
        slideBy: 'page',
        autoplay: false,
        controls: false,
        nav: false,
    });

    document.querySelector('.prev').addEventListener('click', function () {
        slider.goTo('prev');
    });

    document.querySelector('.next').addEventListener('click', function () {
        slider.goTo('next');
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

    

    function toggleSlide(side) {
        $(side).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault(); 
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });
    }
    toggleSlide('.catalog-item__back');
    toggleSlide('.catalog-item__link');

    // MODAL

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn();
    });

    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut();
    });

    $('.button_catalog-item').on('click', function() {
        $('.overlay, #order').fadeIn();
    });

    $('.button_catalog-item').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn();
        });
    });


    // VALIDATION

    valideForms($('#consultation-form'));
    valideForms(('#consultation form'));
    valideForms(('#order form'));
    
    function valideForms(form) {
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: { 
                name: "Пожалуйста, введите своё имя",
                phone: "Пожалуйста, введите свой телефон",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Неверно введена почта. Она должна быть формата name@domain.com"
                }
            }
        });
    }

    //PHONE INPUT MASK

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('input[name=phone]').mask("+7 (999) 999-99-99").on('click', function () {
        if ($(this).val() === '+7 (___) ___-__-__') {
           $(this).get(0).setSelectionRange(4, 4);
           }
    });

    //CONTACTS DELIVER ON YOUR MAIL(check PHP file)

    $('form').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()) {     
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn();

            $('form').trigger('reset');
        });
        return false;
    });

    // PAGEUP, SMOOTH SCROLL

    $(window).scroll(function() {
        if (screen.width < 390) {
            return;
        }
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a").on('click', function(event) {
        if (this.hash !== "") {
          event.preventDefault();

          var hash = this.hash;
          
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 800, function(){
            window.location.hash = hash;
          });
        }
    });

    new WOW().init();
});

