const last_orders_filters = document.querySelectorAll('[data-last-orders-filter]');
const last_orders = document.querySelectorAll('[data-last-orders-item]');
if (last_orders_filters.length > 0 && last_orders.length > 0) {
    last_orders_filters.forEach(last_order_filter => {
        last_orders_filters.forEach(last_order_filter => {
            let i = +last_order_filter.getAttribute('data-last-orders-filter'),
                count = document.querySelectorAll('[data-last-orders-item="'+i+'"]'),
                target = last_order_filter.querySelector('span');

            if (i === 0) {
                target.innerHTML = last_orders.length;
            } else {
                target.innerHTML = count.length;
            }
        });

        last_order_filter.addEventListener('click', () => {
            if (!last_order_filter.classList.contains('_active')) {
                let i = +last_order_filter.getAttribute('data-last-orders-filter');

                last_orders_filters.forEach(item => {
                    item.classList.remove('_active');
                });

                last_order_filter.classList.add('_active');

                if (i === 0) {
                    last_orders.forEach(item => {
                        item.classList.remove('_hide');
                    });    
                } else {
                    last_orders.forEach(item => {
                        if (+item.getAttribute('data-last-orders-item') !== i) {
                            item.classList.add('_hide');
                        } else {
                            item.classList.remove('_hide');
                        }
                    });
                }
            }
        });
    });
}