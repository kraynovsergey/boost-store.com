import rangeSlider from 'range-slider-input';

const range_sliders = document.querySelectorAll('.range-slider');
if (range_sliders.length > 0) {
    range_sliders.forEach(range_slider => {
        let wrap = range_slider.closest('[data-range-slider-wrap]'),
            input_min,
            input_max;

        if (wrap) {
            input_min = range_slider.closest('[data-range-slider-wrap]').querySelector('[data-range-slider-min]'),
            input_max = range_slider.closest('[data-range-slider-wrap]').querySelector('[data-range-slider-max]');
        }

        let range_slider_init = rangeSlider(range_slider, {
            min: range_slider.getAttribute('data-min'),
            max: range_slider.getAttribute('data-max'),
            step: range_slider.getAttribute('data-step'),
            value: [range_slider.getAttribute('data-value-min'), range_slider.getAttribute('data-value-max')],
            onInput: (value, userIteraction) => {
                if (input_min) input_min.value = value[0];
                if (input_max) input_max.value = value[1];
            }
        });

        if (input_min) input_min.value = range_slider_init.value()[0];
        if (input_max) input_max.value = range_slider_init.value()[1];

        if (input_min && input_max) {
            input_min.addEventListener('keyup', () => {
                rangeSlider(range_slider, {
                    min: range_slider.getAttribute('data-min'),
                    max: range_slider.getAttribute('data-max'),
                    step: range_slider.getAttribute('data-step'),
                    value: [input_min.value, input_max.value],
                    onInput: (value, userIteraction) => {
                        if (input_min) input_min.value = value[0];
                        if (input_max) input_max.value = value[1];
                    }
                });
            });

            input_max.addEventListener('keyup', () => {
                rangeSlider(range_slider, {
                    min: range_slider.getAttribute('data-min'),
                    max: range_slider.getAttribute('data-max'),
                    step: range_slider.getAttribute('data-step'),
                    value: [input_min.value, input_max.value],
                    onInput: (value, userIteraction) => {
                        if (input_min) input_min.value = value[0];
                        if (input_max) input_max.value = value[1];
                    }
                });
            });
        }
    });
}