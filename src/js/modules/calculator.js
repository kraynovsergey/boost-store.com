const calculator_btns = document.querySelectorAll('[data-calculator-header-btn]');
const calculator_chooses = document.querySelectorAll('[data-calculator-choose]');
const calculator_pictures = document.querySelectorAll('[data-picture-item]');

if (calculator_btns.length > 0 && calculator_chooses.length > 0) {
    calculator_btns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (!btn.classList.contains('_active')) {
                let i = +btn.getAttribute('data-calculator-header-btn');

                calculator_btns.forEach(item => {
                    if (+item.getAttribute('data-calculator-header-btn') === i) {
                        item.classList.add('_active');
                    } else {
                        item.classList.remove('_active');
                    }
                });

                calculator_chooses.forEach(item => {
                    if (+item.getAttribute('data-calculator-choose') === i) {
                        item.classList.add('_active');
                    } else {
                        item.classList.remove('_active');
                    }
                });

                calculator_pictures.forEach(item => {
                    if (+item.getAttribute('data-picture-item') === i) {
                        item.classList.add('_active');
                    } else {
                        item.classList.remove('_active');
                    }
                })
            }
        }); 
    });
}

const calculator_subbtns = document.querySelectorAll('[data-calculator-subbtn]');
const calculator_subchooses = document.querySelectorAll('[data-calculator-subchoose]');

if (calculator_subbtns.length > 0 && calculator_subchooses.length > 0) {
    calculator_subbtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (!btn.classList.contains('_active')) {
                let i = +btn.getAttribute('data-calculator-subbtn'),
                    subbts = btn.closest('[data-calculator-choose]').querySelectorAll('[data-calculator-subbtn]'),
                    subchooses = btn.closest('[data-calculator-choose]').querySelectorAll('[data-calculator-subchoose]');

                subbts.forEach(item => {
                    if (+item.getAttribute('data-calculator-subbtn') === i) {
                        item.classList.add('_active');
                    } else {
                        item.classList.remove('_active');
                    }
                });

                subchooses.forEach(item => {
                    if (+item.getAttribute('data-calculator-subchoose') === i) {
                        item.classList.add('_active');
                    } else {
                        item.classList.remove('_active');
                    }
                })
            }
        }); 
    });
}

const calculator_switches = document.querySelectorAll('.calculator__condition-switch-input');
if (calculator_switches.length > 0) {
    calculator_switches.forEach(calculator_switch => {
        calculator_switch.addEventListener('change', () => {
            if (calculator_switch.checked === true) {
                let checkbox = calculator_switch.closest('.calculator__condition').querySelector('.calculator__condition-checkbox-input'),
                    checkbox_all = checkbox.closest('[data-calculator-subchoose]').querySelector('.calculator__condition-checkbox-input._all'),
                    switch_all = checkbox.closest('[data-calculator-subchoose]').querySelector('.calculator__condition-switch-input._all');

                if (checkbox) {
                    checkbox.checked = true;
                }

                if (!calculator_switch.classList.contains('_all')) {
                    checkbox_all.checked = false;
                    switch_all.checked = false;
                } else {
                    let other_checkboxes = calculator_switch.closest('[data-calculator-subchoose]').querySelectorAll('.calculator__condition-checkbox-input:not(._all)'),
                        other_switches = calculator_switch.closest('[data-calculator-subchoose]').querySelectorAll('.calculator__condition-switch-input:not(._all)');

                    other_checkboxes.forEach(item => {
                        item.checked = false;
                    });

                    other_switches.forEach(item => {
                        item.checked = false;
                    })
                }
            }
        });
    });
}

const calculator_checkboxes = document.querySelectorAll('.calculator__condition-checkbox-input');
if (calculator_checkboxes.length > 0) {
    calculator_checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            let switch_input = checkbox.closest('.calculator__condition').querySelector('.calculator__condition-switch-input'),
                checkbox_all = checkbox.closest('[data-calculator-subchoose]').querySelector('.calculator__condition-checkbox-input._all'),
                switch_all = checkbox.closest('[data-calculator-subchoose]').querySelector('.calculator__condition-switch-input._all');

            if (switch_input && checkbox.checked === false) {
                switch_input.checked = false;
            }

            if (!checkbox.classList.contains('_all')) {
                checkbox_all.checked = false;
                switch_all.checked = false;
            } else {
                let other_checkboxes = checkbox.closest('[data-calculator-subchoose]').querySelectorAll('.calculator__condition-checkbox-input:not(._all)'),
                    other_switches = checkbox.closest('[data-calculator-subchoose]').querySelectorAll('.calculator__condition-switch-input:not(._all)');

                other_checkboxes.forEach(item => {
                    item.checked = false;
                });

                other_switches.forEach(item => {
                    item.checked = false;
                })
            }
        })
    });
}