$(document).ready(function () {
    function removeErrorMessages() {
        $('.profile-modal__row').removeClass('profile-modal__row-error');
        $('.checkbox__input-error').hide();
        $('.checkbox__label').removeClass('checkbox__label-error');
    }

    // Событие ввода значения в поле email
    $('input[name="email"]').on('input', function () {
        const email_field = $(this);
        if (isValidEmail(email_field.val())) {
            clearFieldError(email_field);
        }
    });

    // Событие ввода значения в поле password
    $('input[name="password"]').on('input', function () {
        const password = $(this);
        if (password.val().length > 0) {
            clearFieldError(password);
        }
    });

    // Событие ввода значения в поле confirm_password
    $('input[name="confirm_password"]').on('input', function () {
        const confirm_password = $(this);
        if (confirm_password.val().length > 0) {
            clearFieldError(confirm_password);
        }
    });

    // Обработчик изменения состояния чекбокса privacy-policy
    $('input[name="accept_privacy"]').change(function () {
        const privacy_field = $(this);

        if (privacy_field.is(':checked')) {
            clearFieldError(privacy_field, true);
        }
    });

    // При нажатии на кнопку отправки формы
    $('form[name="regform"]').submit(function (e) {
        e.preventDefault();

        const email = $('input[name="email"]');
        const password = $('input[name="password"]');
        const confirm_password = $('input[name="confirm_password"]');
        const privacy_checkbox = $('input[name="accept_privacy"]');
        const mailing_checkbox = $('input[name="accept_mailing"]');

        // Флаг валидации формы
        is_valid = true;

        // Убираем предыдущие сообщения об ошибках
        removeErrorMessages();

        // Проверяем поля для ввода паролей
        if (password.val() !== confirm_password.val()) {
            const errorMessage = "<p class='checkbox__input-error'>You entered different passwords</p>";
            password.closest('.profile-modal__row').addClass('profile-modal__row-error').after(errorMessage);
            confirm_password.closest('.profile-modal__row').addClass('profile-modal__row-error').after(errorMessage);
            is_valid = false;
        }

        // Валидация email
        if (!isValidEmail(email.val())) {
            email.closest('.profile-modal__row')
                .addClass('profile-modal__row-error')
                .after("<p class='checkbox__input-error'>Please enter a valid email address</p>");
            is_valid = false;
        }

        // Проверка чекбокса политики конфиденциальности
        if (!privacy_checkbox.is(':checked')) {
            privacy_checkbox.next('.checkbox__label').addClass('checkbox__label-error').after("<p class='checkbox__input-error'>Please check the Privacy policy</p>");
            is_valid = false;
        }

        // Проверка поля password на пустоту
        if (password.val().trim() === '') {
            password.closest('.profile-modal__row')
                .addClass('profile-modal__row-error')
                .after("<p class='checkbox__input-error'>Password cannot be empty</p>");
        }

        // Проверка поля confirm_password на пустоту
        if (confirm_password.val().trim() === '') {
            confirm_password.closest('.profile-modal__row')
                .addClass('profile-modal__row-error')
                .after("<p class='checkbox__input-error'>Confirm Password cannot be empty</p>");
        }

        if (is_valid) {
            // Параметры, которые будут отправлены
            const postData = {
                'REGISTER[LOGIN]': email.val(),
                'REGISTER[EMAIL]': email.val(),
                'REGISTER[PASSWORD]': password.val(),
                'REGISTER[CONFIRM_PASSWORD]': confirm_password.val(),
                'register_submit_button': 'Registration',
                'subscribe': mailing_checkbox.val(),
                'sessid': BX.bitrix_sessid()
            };

            // AJAX запрос
            $.ajax({
                type: 'POST', // Метод отправки
                url: '/local/templates/boost_store/ajax/register.php', // URL отправки (текущий URL)
                data: postData, // Данные формы
                success: function (response) {
                    // Если пользователь успешно зарегистрировался
                    if (response.success) {
                        console.log('Success')
                        $('.profile-sign-up').removeClass('popup_show');
                        $('.register-success').addClass('popup_show');
                    }
                },
                error: function (error) {
                    // Обработка ошибки
                    console.log(error);
                }
            });
        }

    });
});