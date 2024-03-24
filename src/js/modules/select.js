import NiceSelect from '../../../node_modules/nice-select2/dist/js/nice-select2.js';

const selects = document.querySelectorAll('.select');
if (selects.length > 0) {
    selects.forEach(select => {
        NiceSelect.bind(select);
    })
}