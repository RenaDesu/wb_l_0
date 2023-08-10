const totalProducts = document.querySelector('[data-total-products]');
const totalSum = document.querySelector('[data-total-sum]');
const totalPriceEl = document.querySelector('.total__price');

function productCounter() {
    let counter;

    let card;
    let price;
    let priceOld;
    let checkbox;

    let priceTotal = 0;
    let priceOldTotal = 0;

    window.addEventListener('click', function (event) {

        if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {

            const counterWrapper = event.target.closest('.card-footer__buttons-group');
            counter = counterWrapper.querySelector('[data-counter]');

            card = event.target.closest('.card');
            price = card.querySelector('.card__price-current');
            priceOld = card.querySelector('.card__price-old');
            checkbox = card.querySelector('[data-checkbox]');
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

            const priceTotalSpaces = priceTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            const priceOldTotalSpaces = priceTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

            const newPrice = priceTotalSpaces + ' ' + 'сом';
            const newOldPrice = priceOldTotalSpaces + ' ' + 'сом';

            //Новое значение цены в карточке товара
            price.innerText = newPrice;
            priceOld.innerText = newOldPrice;

            const totalSumText = totalSum.innerText;
            const totalSumTextNoSpaces = totalSumText.replace(/[^0-9]/g, '');
            const totalSumNew = parseInt(totalSumTextNoSpaces) + parseInt(priceSet);

            const totalSumNewSpaces = totalSumNew.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

            //Новое значение цены товаров в корзине (где заголовок спойлера)
            totalSum.innerText = totalSumNewSpaces + ' ' + 'сом';

            const totalProductsText = totalProducts.innerText;
            const totalProductsTextNoSpaces = totalProductsText.replace(/[^0-9]/g, '');
            const totalProductsNew = parseInt(totalProductsTextNoSpaces) + 1;

            //Новое значение кол-ва товаров в корзине (где заголовок спойлера)
            totalProducts.innerText = totalProductsNew + ' ' + 'товаров';

            if (checkbox.checked) {
                const totalPriceElText = totalPriceEl.innerText;
                const totalPriceElTextNoSpaces = totalPriceElText.replace(/[^0-9]/g, '');
                
                const totalPriceElNew = parseInt(totalPriceElTextNoSpaces) + parseInt(priceSet);

                const totalPriceElNewSpaces = totalPriceElNew.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                totalPriceEl.innerText = totalPriceElNewSpaces + ' ' + 'сом';
            }
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

                const priceTotalSpaces = priceTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                const priceOldTotalSpaces = priceTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

                const newPrice = priceTotalSpaces + ' ' + 'сом';
                const newOldPrice = priceOldTotalSpaces + ' ' + 'сом';

                //Новое значение цены в карточке товара
                price.innerText = newPrice;
                priceOld.innerText = newOldPrice;

                const totalSumText = totalSum.innerText;
                const totalSumTextNoSpaces = totalSumText.replace(/[^0-9]/g, '');
                const totalSumNew = parseInt(totalSumTextNoSpaces) - parseInt(priceSet);

                const totalSumNewSpaces = totalSumNew.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

                //Новое значение цены товаров в корзине (где заголовок спойлера)
                totalSum.innerText = totalSumNewSpaces + ' ' + 'сом';

                const totalProductsText = totalProducts.innerText;
                const totalProductsTextNoSpaces = totalProductsText.replace(/[^0-9]/g, '');
                const totalProductsNew = parseInt(totalProductsTextNoSpaces) - 1;

                //Новое значение кол-ва товаров в корзине (где заголовок спойлера)
                totalProducts.innerText = totalProductsNew + ' ' + 'товаров';

                if (checkbox.checked) {

                    const totalPriceElText = totalPriceEl.innerText;
                    const totalPriceElTextNoSpaces = totalPriceElText.replace(/[^0-9]/g, '');
                    const totalPriceElNew = parseInt(totalPriceElTextNoSpaces) - parseInt(priceSet);

                    const totalPriceElNewSpaces = totalPriceElNew.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                    totalPriceEl.innerText = totalPriceElNewSpaces + ' ' + 'сом';
                }
            }

        }
    });
}

export {
    productCounter
};