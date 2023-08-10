function productCounter() {
    let counter;

    let card;
    let price;
    let priceOld;

    let priceTotal = 0;
    let priceOldTotal = 0;

    window.addEventListener('click', function (event) {

        if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {

            const counterWrapper = event.target.closest('.card-footer__buttons-group');
            counter = counterWrapper.querySelector('[data-counter]');

            card = event.target.closest('.card');
            price = card.querySelector('.card__price-current');
            priceOld = card.querySelector('.card__price-old');
        }

        if (event.target.dataset.action === 'plus') {
            if (card.getAttribute('data-id') === '1') {
                if (parseInt(counter.value) <= 2) {
                    counter.value = ++counter.value;
                }
            } else if (card.getAttribute('data-id') === '2') {
                if (parseInt(counter.value) <= 209) {
                    counter.value = ++counter.value;
                }
            } else if (card.getAttribute('data-id') === '3') {
                if (parseInt(counter.value) <= 3) {
                    counter.value = ++counter.value;
                }
            }
            const priceSet = price.dataset.current;
            const oldPriceSet = priceOld.dataset.old;

            priceTotal = (priceSet * parseInt(counter.value));
            priceOldTotal = (oldPriceSet * parseInt(counter.value));

            const newPrice = priceTotal + ' ' + 'сом';
            const newOldPrice = priceOldTotal + ' ' + 'сом';
            price.innerText = newPrice;
            priceOld.innerText = newOldPrice;
        }

        if (event.target.dataset.action === 'minus') {

            if (parseInt(counter.value) > 1) {
                counter.value = --counter.value;

                const priceSet = price.dataset.current;
                const oldPriceSet = priceOld.dataset.old;

                const priceText = price.innerText;
                const priceTextNoSpaces = priceText.replace(/[^0-9]/g, '');
                const priceTextClean = parseInt(priceTextNoSpaces);

                const priceOldText = priceOld.innerText;
                const priceOldTextNoSpaces = priceOldText.replace(/[^0-9]/g, '');
                const priceOldTextClean = parseInt(priceOldTextNoSpaces);

                priceTotal = (priceTextClean - priceSet);
                priceOldTotal = (priceOldTextClean - oldPriceSet);

                const newPrice = priceTotal + ' ' + 'сом';
                const newOldPrice = priceOldTotal + ' ' + 'сом';
                price.innerText = newPrice;
                priceOld.innerText = newOldPrice;
            }

        }
    });
}

export {
    productCounter
};