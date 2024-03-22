$(document).ready(function () {
    $('.auth-ajax-form').submit(function (e) {
        e.preventDefault();

        const email = $('input[name="auth-email"]');
        const password = $('input[name="auth-password"]');

        const postData = {
            'AUTH_FORM': 'Y',
            'TYPE': 'AUTH',
            'backurl': '/profile/',
            'USER_LOGIN': email.val(),
            'USER_PASSWORD': password.val(),
            'Login': 'Authorize',
            'action': 'AUTH_ACTION'
        };

        // AJAX запрос
        $.ajax({
            type: 'POST',
            url: '/profile/?login=yes',
            data: postData,
            success: function (response) {
                // Обработка успешного ответа
                if (response.auth === 'success') {
                    window.location = '/profile/';
                }
            },
            error: function (xhr) {
                // Обработка ошибки
                console.log(xhr);
                // Обработка ошибки
                if (xhr.status === 401) {
                    var response = JSON.parse(xhr.responseText);

                    if (response.TYPE === 'ERROR') {
                        $('.auth-error').text(response.MESSAGE);
                    }
                }
            }
        });

    });
});
