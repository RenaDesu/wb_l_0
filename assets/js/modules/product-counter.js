const totalProducts = document.querySelector('[data-total-products]');
const totalSum = document.querySelector('[data-total-sum]');
const totalPriceEl = document.querySelector('.total__price');
const totalPriceNoDiscountEl = document.querySelector('#total-price');
const totalProductsEl = document.querySelector('#total-products');
const totalDiscount = document.querySelector('#discount');

function productCounter() {

    let counter;

    let card;
    let price;
    let priceOld;
    let checkbox;
    let plus;

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
            plus = card.querySelector('[data-action="plus"]');
        }

        if (event.target.dataset.action === 'plus') {
            if (card.getAttribute('data-id') === '1') {
                counter.value = ++counter.value;

                if (parseInt(counter.value) == 3) {
                    event.target.disabled = true;
                }

            } else if (card.getAttribute('data-id') === '2') {
                counter.value = ++counter.value;

                if (parseInt(counter.value) == 210) {
                    event.target.disabled = true;
                }

            } else if (card.getAttribute('data-id') === '3') {
                counter.value = ++counter.value;

                if (parseInt(counter.value) == 4) {
                    event.target.disabled = true;
                }
            }

            //Цена товаров со скидкой и без
            const priceSet = price.dataset.current;
            const oldPriceSet = priceOld.dataset.old;

            //Расчет нового значения цены в карточке товара
            priceTotal = (priceSet * parseInt(counter.value));
            priceOldTotal = (oldPriceSet * parseInt(counter.value));

            const priceTotalSpaces = priceTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            const priceOldTotalSpaces = priceOldTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

            const newPrice = priceTotalSpaces + ' ' + 'сом';
            const newOldPrice = priceOldTotalSpaces + ' ' + 'сом';

            //Новое значение цены в карточке товара
            price.innerText = newPrice;
            priceOld.innerText = newOldPrice;

            //Расчет нового значения цены товаров в корзине (где заголовок спойлера)
            const totalSumText = totalSum.innerText;
            const totalSumTextNoSpaces = totalSumText.replace(/[^0-9]/g, '');
            const totalSumNew = parseInt(totalSumTextNoSpaces) + parseInt(priceSet);

            const totalSumNewSpaces = totalSumNew.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

            //Новое значение цены товаров в корзине (где заголовок спойлера)
            totalSum.innerText = totalSumNewSpaces + ' ' + 'сом';

            //Расчет нового значения кол-ва товаров в корзине (где заголовок спойлера)
            const totalProductsText = totalProducts.innerText;
            const totalProductsTextNoSpaces = totalProductsText.replace(/[^0-9]/g, '');
            const totalProductsNew = parseInt(totalProductsTextNoSpaces) + 1;

            //Новое значение кол-ва товаров в корзине (где заголовок спойлера)
            totalProducts.innerText = totalProductsNew + ' ' + 'товаров';

            if (checkbox.checked) {
                // Расчет итоговой цены выбранных товаров со скидкой и без
                const totalPriceElText = totalPriceEl.innerText;
                const totalPriceElTextNoSpaces = totalPriceElText.replace(/[^0-9]/g, '');

                const totalPriceNoDiscountElText = totalPriceNoDiscountEl.innerText;
                const totalPriceNoDiscountElNoSpaces = totalPriceNoDiscountElText.replace(/[^0-9]/g, '');

                const totalPriceElNew = parseInt(totalPriceElTextNoSpaces) + parseInt(priceSet);
                const totalPriceNoDiscountElNew = parseInt(totalPriceNoDiscountElNoSpaces) + parseInt(oldPriceSet);

                const totalPriceElNewSpaces = totalPriceElNew.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                const totalPriceNoDiscountElNewSpaces = totalPriceNoDiscountElNew.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

                // Новое значение итоговой цены выбранных товаров со скидкой и без
                totalPriceEl.innerText = totalPriceElNewSpaces + ' ' + 'сом';
                totalPriceNoDiscountEl.innerText = totalPriceNoDiscountElNewSpaces + ' ' + 'сом';

                //Расчет суммы скидки выбранных товаров 
                const discountTotal = totalDiscount.innerText;
                const discountTotalNoSpaces = discountTotal.replace(/[^0-9]/g, '');
                const discountTotalClean = parseInt(discountTotalNoSpaces);

                const discountSum = discountTotalClean + (parseInt(oldPriceSet) - parseInt(priceSet));
                const discountSumSpaces = discountSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                const discountSumFinal = '-' + discountSumSpaces + ' ' + 'сом'

                // Новое значение суммы скидки выбранных товаров 
                totalDiscount.innerText = discountSumFinal;

                //Расчет нового значения кол-ва выбранных товаров
                const totalProductsText = totalProductsEl.innerText;
                const totalProductsTextNoSpaces = totalProductsText.replace(/[^0-9]/g, '');

                const totalProductsNew = parseInt(totalProductsTextNoSpaces) + 1;

                //Новое значение кол-ва выбранных товаров
                totalProductsEl.innerText = totalProductsNew + ' ' + 'товаров';

                //Кол-во товаров в доставке
                if (card.getAttribute('data-id') === '1') {
                    const label = document.querySelector('[data-label="1"]')
                    label.innerText = counter.value;
                } else if (card.getAttribute('data-id') === '2') {
                    const label = document.querySelector('[data-label="2"]')
                    label.innerText = counter.value;
                } else if (card.getAttribute('data-id') === '3') {
                    const label = document.querySelector('[data-label="3"]')
                    label.innerText = counter.value;
                } 
            }
        }

        if (event.target.dataset.action === 'minus') {

            if (parseInt(counter.value) > 1) {
                if (card.getAttribute('data-id') === '1') {
                    plus.disabled = false;
                } else if (card.getAttribute('data-id') === '2') {
                    plus.disabled = false;
                } else if (card.getAttribute('data-id') === '3') {
                    plus.disabled = false;
                }

                counter.value = --counter.value;

                //Цена товаров со скидкой и без
                const priceSet = price.dataset.current;
                const oldPriceSet = priceOld.dataset.old;

                //Расчет нового значения цены в карточке товара
                const priceText = price.innerText;
                const priceTextNoSpaces = priceText.replace(/[^0-9]/g, '');
                const priceTextClean = parseInt(priceTextNoSpaces);

                const priceOldText = priceOld.innerText;
                const priceOldTextNoSpaces = priceOldText.replace(/[^0-9]/g, '');
                const priceOldTextClean = parseInt(priceOldTextNoSpaces);

                priceTotal = (priceTextClean - priceSet);
                priceOldTotal = (priceOldTextClean - oldPriceSet);

                const priceTotalSpaces = priceTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                const priceOldTotalSpaces = priceOldTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

                const newPrice = priceTotalSpaces + ' ' + 'сом';
                const newOldPrice = priceOldTotalSpaces + ' ' + 'сом';

                //Новое значение цены в карточке товара
                price.innerText = newPrice;
                priceOld.innerText = newOldPrice;

                //Расчет нового значения цены товаров в корзине (где заголовок спойлера)
                const totalSumText = totalSum.innerText;
                const totalSumTextNoSpaces = totalSumText.replace(/[^0-9]/g, '');
                const totalSumNew = parseInt(totalSumTextNoSpaces) - parseInt(priceSet);

                const totalSumNewSpaces = totalSumNew.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

                //Новое значение цены товаров в корзине (где заголовок спойлера)
                totalSum.innerText = totalSumNewSpaces + ' ' + 'сом';

                //Расчет нового значения кол-ва товаров в корзине (где заголовок спойлера)
                const totalProductsText = totalProducts.innerText;
                const totalProductsTextNoSpaces = totalProductsText.replace(/[^0-9]/g, '');
                const totalProductsNew = parseInt(totalProductsTextNoSpaces) - 1;

                //Новое значение кол-ва товаров в корзине (где заголовок спойлера)
                totalProducts.innerText = totalProductsNew + ' ' + 'товаров';

                if (checkbox.checked) {
                    // Расчет итоговой цены выбранных товаров со скидкой и без
                    const totalPriceElText = totalPriceEl.innerText;
                    const totalPriceElTextNoSpaces = totalPriceElText.replace(/[^0-9]/g, '');

                    const totalPriceNoDiscountElText = totalPriceNoDiscountEl.innerText;
                    const totalPriceNoDiscountElNoSpaces = totalPriceNoDiscountElText.replace(/[^0-9]/g, '');

                    const totalPriceElNew = parseInt(totalPriceElTextNoSpaces) - parseInt(priceSet);
                    const totalPriceNoDiscountElNew = parseInt(totalPriceNoDiscountElNoSpaces) - parseInt(oldPriceSet);

                    const totalPriceElNewSpaces = totalPriceElNew.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                    const totalPriceNoDiscountElNewSpaces = totalPriceNoDiscountElNew.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

                    // Новое значение итоговой цены выбранных товаров со скидкой и без
                    totalPriceEl.innerText = totalPriceElNewSpaces + ' ' + 'сом';
                    totalPriceNoDiscountEl.innerText = totalPriceNoDiscountElNewSpaces + ' ' + 'сом';

                    //Расчет суммы скидки выбранных товаров 
                    const discountTotal = totalDiscount.innerText;
                    const discountTotalNoSpaces = discountTotal.replace(/[^0-9]/g, '');
                    const discountTotalClean = parseInt(discountTotalNoSpaces);

                    const discountSum = discountTotalClean - (parseInt(oldPriceSet) - parseInt(priceSet));
                    const discountSumSpaces = discountSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                    const discountSumFinal = '-' + discountSumSpaces + ' ' + 'сом'

                    // Новое значение суммы скидки выбранных товаров 
                    totalDiscount.innerText = discountSumFinal;

                    //Расчет нового значения кол-ва выбранных товаров
                    const totalProductsText = totalProductsEl.innerText;
                    const totalProductsTextNoSpaces = totalProductsText.replace(/[^0-9]/g, '');

                    const totalProductsNew = parseInt(totalProductsTextNoSpaces) - 1;

                    //Новое значение кол-ва выбранных товаров
                    totalProductsEl.innerText = totalProductsNew + ' ' + 'товаров';

                    //Кол-во товаров в доставке
                    if (card.getAttribute('data-id') === '1') {
                        const label = document.querySelector('[data-label="1"]')
                        label.innerText = counter.value;
                    } else if (card.getAttribute('data-id') === '2') {
                        const label = document.querySelector('[data-label="2"]')
                        label.innerText = counter.value;
                    } else if (card.getAttribute('data-id') === '3') {
                        const label = document.querySelector('[data-label="3"]')
                        label.innerText = counter.value;
                    } 
                }
            }

        }
    });
}

export {
    productCounter
};