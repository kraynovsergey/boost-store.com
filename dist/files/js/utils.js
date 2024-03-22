// Валидация email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return re.test(email);
}

// Функция для удаления сообщения об ошибке и класса ошибки у конкретного поля
function clearFieldError(field, is_checkbox) {
    // Если проверяем чекбокс
    if (is_checkbox) {
        field.next('.checkbox__label').removeClass('checkbox__label-error');
        field.next('.checkbox__label').next('.checkbox__input-error').remove();
        return;
    }

    field.closest('.profile-modal__row').removeClass('profile-modal__row-error');
    field.parent().next('.checkbox__input-error').remove(); // Предполагается, что сообщение об ошибке находится сразу после поля
}