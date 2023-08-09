function productCounter() {
    window.addEventListener('click', function (event) {

        let counter;

        if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {

            const counterWrapper = event.target.closest('.card-footer__buttons-group');
            counter = counterWrapper.querySelector('[data-counter]');
        }

        if (event.target.dataset.action === 'plus') {
            counter.value = ++counter.value;
        }

        if (event.target.dataset.action === 'minus') {

            if (parseInt(counter.value) > 1) {
                counter.value = --counter.value;
            }

        }
    });
}

export {
    productCounter
};