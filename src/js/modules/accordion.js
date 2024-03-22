import Accordion from 'accordion-js';

const accordion_faq = document.querySelector('[data-accordion-faq]');
if (accordion_faq) {
    new Accordion(accordion_faq, {
        activeClass: '_active',
        openOnInit: [0]
    });
}