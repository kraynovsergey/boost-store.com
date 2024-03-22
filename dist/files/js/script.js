$(document).ready(function () {

    let isShowMobMenu = +localStorage.getItem('show-mob-menu') || false;
    let isShowGameMenu = false;
    let isShowNewsMenu = false;
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    function calibrateMenu(menuElem, maxHeight) {
        menuElem.css('top', $('.header').outerHeight());
        if (maxHeight) {
            menuElem.css('max-height',
                $(window).outerHeight() - $('.header').outerHeight()
            );
        }
    }

    $( window ).resize(function() {
        vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        if (isShowGameMenu) {
            calibrateMenu($('.header__navbar-games-list'), true);
        } else if (isShowMobMenu) {
            calibrateMenu($('.sidebar__active'), true);
        } else if (isShowNewsMenu) {
            calibrateMenu($('.select__wrap-list_news'), false);
        }
    });

    // Открытие попапа авторизации
    $('.link-auth-js').click(function () {
        $('.profile-sign-in').addClass('popup_show');
    });

    // Вешаем событие на все кнопки закрытия попапа
    $('button[data-close]').click(function () {
        $(this).closest('.popup').removeClass('popup_show');
    });

    // Обработчик клика на кнопку "Sign up"
    $('.profile-modal__button--second').click(function () {
        // Проверяем, находится ли кнопка внутри попапа авторизации
        if ($(this).closest('.popup').hasClass('profile-sign-in')) {
            $('.profile-sign-in').removeClass('popup_show');

            $('.profile-sign-up').addClass('popup_show');
        }
    });

    // Обработчик клика на ссылку "Already signed up? Log In!"
    $('.profile-modal__recover').click(function (e) {
        // Предотвращаем действие по умолчанию для ссылки
        e.preventDefault();

        // Закрытие попапа регистрации
        $('.profile-sign-up').removeClass('popup_show');

        // Открытие попапа авторизации
        $('.profile-sign-in').addClass('popup_show');
    });

    // Закрытие попапа при клике вне его области
    $(document).mouseup(function (e) {
        var popup = $(".popup__content"); // Селектор для контентной части попапа
        if (!popup.is(e.target) && popup.has(e.target).length === 0) {
            $('.popup').removeClass('popup_show'); // Удаление класса для отображения попапа
        }
    });

    // Закрытие попапа при нажатии на Esc
    $(document).keydown(function (e) {
        if (e.key === "Escape") { // Проверка на нажатие клавиши Esc
            $('.popup').removeClass('popup_show');
        }
    });

    // Обработчик клика на select_click
    $('.select__button').click(function (e) {
        e.preventDefault();
        const selectElem = $(this).parent('.select_click');
        // Если нажата кнопка меню игр
        if (selectElem.hasClass('header__games-button')) {
            if (!isShowGameMenu) {
               if (isShowMobMenu) {
                   isShowMobMenu = !isShowMobMenu;
                   localStorage.setItem('show-mob-menu', String(+isShowMobMenu));
                   toggleMobileMenu();
               } else if (isShowNewsMenu) {
                   isShowNewsMenu = !isShowNewsMenu;
                   toggleNewsMenu();
               }
            }
            isShowGameMenu = !isShowGameMenu;
            // Если нажата кнопка меню новостей
        } else if (selectElem.hasClass('header__navbar-item_news')) {
            if (!isShowNewsMenu) {
                if (isShowGameMenu) {
                    isShowGameMenu = !isShowGameMenu;
                    toggleGameMenu();
                }
            }
            isShowNewsMenu = !isShowNewsMenu;
        }
        if (isShowGameMenu) {
            calibrateMenu($('.header__navbar-games-list'), true);
        } else if (isShowNewsMenu) {
            calibrateMenu($('.select__wrap-list_news'), false);
        }
        selectElem.find('.select__wrap-list').toggleClass('select__wrap-list_active');
        $(this).toggleClass('active');
    })
    function toggleGameMenu() {
        const selectElem = $('.header__games-button');
        if (isShowGameMenu) {
            selectElem.find('.select__wrap-list').addClass('select__wrap-list_active');
            $('.select__wrap-list_active').css('top', $('.header').outerHeight());
            selectElem.find('.select__button').addClass('active');
        } else {
            selectElem.find('.select__wrap-list').removeClass('select__wrap-list_active');
            selectElem.find('.select__button').removeClass('active');
        }
    }
    function toggleNewsMenu() {
        const selectElem = $('.header__navbar-item_news');
        if (isShowGameMenu) {
            selectElem.find('.select__wrap-list').addClass('select__wrap-list_active');
            $('.select__wrap-list_active').css('top', $('.header').outerHeight());
            selectElem.find('.select__button').addClass('active');
        } else {
            selectElem.find('.select__wrap-list').removeClass('select__wrap-list_active');
            selectElem.find('.select__button').removeClass('active');
        }
    }

    // Выбор валюты
    const currency = $.cookie('currency') || 'BASE';
    const curElem = $(`[data-id = ${currency}]`);
    curElem.addClass('select__list-item_selected');
    curElem.closest('.header__select-currency').find('.select__field-text').html(curElem.html());
    $('.select__list-link').click(function (e) {
        e.preventDefault();
        const id = $(this).attr('data-id');
        $.cookie('currency', id, { expires: 365 });
        location.reload(true);
    })

    // Всплывающее меню адаптив
    function toggleMobileMenu() {
        if (isShowMobMenu) {
            $('.burger-btn').html('<svg width="38"\n' +
                '                     height="28"\n' +
                '                     viewBox="0 0 22 22"\n' +
                '                     fill="none" xmlns="http://www.w3.org/2000/svg"' +
                '                 >\n' +
                '                     <path d="M1 21L11 11M11 11L20.9999 1M11 11L20.9999 21M11 11L1 1"\n' +
                '                           stroke="white" stroke-width="2" stroke-linecap="round"/>\n' +
                '         </svg>');
            $('.header .logo').addClass('mobile-hidden');
            $('.sidebar-nav').addClass('sidebar__active');
            $('.sidebar__active').css('top', $('.header').outerHeight());
            $('.header__link-cart').removeClass('mobile-hidden');
            $('.header__link-auth').removeClass('mobile-hidden');
        } else {
            $('.burger-btn').html('<svg width="38"\n' +
                '                     height="28"\n' +
                '                     fill="none"\n' +
                '                     xmlns="http://www.w3.org/2000/svg"\n' +
                '                     xmlns:xlink="http://www.w3.org/1999/xlink"\n' +
                '                >\n' +
                '                    <path fill="url(#menu_svg__pattern0)" d="M0 0h38v28H0z"></path>\n' +
                '                    <defs>\n' +
                '                        <pattern id="menu_svg__pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">\n' +
                '                            <use xlink:href="#menu_svg__image0" transform="matrix(.03571 0 0 .04847 0 -.009)"></use>\n' +
                '                        </pattern>\n' +
                '                        <image id="menu_svg__image0"\n' +
                '                               width="28"\n' +
                '                               height="21"\n' +
                '                               xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAVCAYAAABVAo5cAAAAh0lEQVRIie2TzQrCMBCEv+TaN/ZoD32B0gfVo5aVQINDiNFI8CA7sOxPkp3JYYKZzcCJPhgQjkxRZ+Q72i+J8AJMclB73Fqk83e4RmCVBaVqRXgxVxG1M8WWfviBsHGIP2Vzwr8hTMbfO+POM5d1jlulP7vxh8ON74RfEbrxVUhtriLaxoftAYrSZkHMPu1pAAAAAElFTkSuQmCC"\n' +
                '                        ></image>\n' +
                '                    </defs>\n' +
                '                </svg>');
            $('header .logo').removeClass('mobile-hidden');
            $('.sidebar-nav').removeClass('sidebar__active');
            $('.header__link-cart').addClass('mobile-hidden');
            $('.header__link-auth').addClass('mobile-hidden');
        }
    }
    toggleMobileMenu();
    $('.burger-btn').click(function (e) {
        // Если открыто меню игр, то закрываем его
        if (isShowGameMenu && !isShowMobMenu) {
            isShowGameMenu = !isShowGameMenu;
            toggleGameMenu();
        }
        isShowMobMenu = !isShowMobMenu;
        localStorage.setItem('show-mob-menu', String(+isShowMobMenu));
        calibrateMenu($('.sidebar__active'), true);
        toggleMobileMenu();
    })

})