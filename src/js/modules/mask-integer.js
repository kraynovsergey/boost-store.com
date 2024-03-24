const mask_integer_inputs = document.querySelectorAll('[data-mask-integer]');

if (mask_integer_inputs.length > 0) {
    mask_integer_inputs.forEach(mask_integer_input => {
        mask_integer_input.addEventListener('input', () => {
            if (mask_integer_input.validity.valid) {
                mask_integer_input.setAttribute('current-value', mask_integer_input.value.replace(/[^\d]/g, ""));
            }
            mask_integer_input.value = mask_integer_input.getAttribute('current-value');
        });
    });
}