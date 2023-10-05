import {
    getNoun
} from './utils';

const totalPriceEl = document.querySelector('.total__price');
const totalPriceNoDiscountEl = document.querySelector('#total-price');
const totalDiscount = document.querySelector('#discount');
const totalProductsEl = document.querySelector('#total-products');
const deliveryContainer = document.querySelector('[data-delivery-container]');
const deliveryList = document.querySelector('[data-delivery-list]');
const deliveryTitle = document.querySelector('[data-delivery-title]');
const totalSumCart = document.querySelector('[data-total-sum]');
const totalProductsCart = document.querySelector('[data-total-products]');
const cartLabels = document.querySelectorAll('[data-cart-label]');
const missingQty = document.querySelector('[data-missing-qty]');

function removeCard() {
    window.addEventListener('click', function (event) {
        if (event.target.hasAttribute('data-remove')) {
            const card = event.target.closest('.card');
            const cardMissing = event.target.closest('.card--missing');
            const price = card.querySelector('.card__price-current');
            const priceOld = card.querySelector('.card__price-old');
            const checkbox = card.querySelector('[data-checkbox]');
            const productsCounter = card.querySelector('[data-counter]');
            const counter = card.querySelector('[data-counter]');

            if (cardMissing) {
                cardMissing.remove();
                const missingCards = document.querySelectorAll('.card--missing');
                const qty = missingCards.length;
                missingQty.innerText = `${getNoun(qty, 'Отсутствует', 'Отсутствуют', 'Отсутствуют')} · ${qty} ${getNoun(qty, 'товар', 'товара', 'товаров')}`;
                return;
            }

            card.remove();

            const priceText = price.innerText;
            const priceTextNoSpaces = priceText.replace(/[^0-9]/g, '');
            const priceTextClean = parseInt(priceTextNoSpaces);

            const priceOldText = priceOld.innerText;
            const priceOldTextNoSpaces = priceOldText.replace(/[^0-9]/g, '');
            const priceOldTextClean = parseInt(priceOldTextNoSpaces);

            const totalPriceElText = totalPriceEl.innerText;
            const totalPriceElTextNoSpaces = totalPriceElText.replace(/[^0-9]/g, '');
            const totalPriceElTextClean = parseInt(totalPriceElTextNoSpaces);

            const totalPriceNoDiscountElText = totalPriceNoDiscountEl.innerText;
            const totalPriceNoDiscountElTextNoSpaces = totalPriceNoDiscountElText.replace(/[^0-9]/g, '');
            const totalPriceNoDiscountElTextClean = parseInt(totalPriceNoDiscountElTextNoSpaces);

            const productsTotal = totalProductsEl.innerText;
            const productsTotalTotalNoSpaces = productsTotal.replace(/[^0-9]/g, '');
            let productsTotalClean = parseInt(productsTotalTotalNoSpaces);

            //Расчет нового значения цены товаров в корзине (где заголовок спойлера)
            const totalSumCartText = totalSumCart.innerText;
            const totalSumCartTextNoSpaces = totalSumCartText.replace(/[^0-9]/g, '');
            const totalSumCartNew = parseInt(totalSumCartTextNoSpaces) - priceTextClean;
            const totalSumCartNewSpaces = totalSumCartNew.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

            //Новое значение цены товаров в корзине (где заголовок спойлера)
            totalSumCart.innerText = totalSumCartNewSpaces + ' сом';

            //Расчет нового значения кол-ва товаров в корзине (где заголовок спойлера)
            const totalProductsCartText = totalProductsCart.innerText;
            const totalProductsCartNoSpaces = totalProductsCartText.replace(/[^0-9]/g, '');
            const totalProductsCartNew = parseInt(totalProductsCartNoSpaces) - parseInt(counter.value);

            //Новое значение кол-ва товаров в корзине (где заголовок спойлера)
            totalProductsCart.innerText = `${totalProductsCartNew} ${getNoun(totalProductsCartNew, 'товар', 'товара', 'товаров')} `;

            if (checkbox.checked) {
                const newTotalPrice = totalPriceElTextClean - priceTextClean;
                const newTotalPriceSpaces = newTotalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

                const newTotalPriceNoDiscount = totalPriceNoDiscountElTextClean - priceOldTextClean;
                const newTotalPriceNoDiscountSpaces = newTotalPriceNoDiscount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

                const newDiscount = newTotalPriceNoDiscount - newTotalPrice;
                const newDiscountSpaces = newDiscount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

                const productsCounterText = productsCounter.value;
                productsTotalClean -= parseInt(productsCounterText);

                totalProductsEl.innerText = `${productsTotalClean} ${getNoun(productsTotalClean, 'товар', 'товара', 'товаров')} `;

                //Сброс итоговой цены со скидкой и без, сброс кол-ва товаров, сброс суммы скидки
                totalPriceEl.innerText = newTotalPriceSpaces + ' сом'
                totalPriceNoDiscountEl.innerText = newTotalPriceNoDiscountSpaces + ' сом'
                totalDiscount.innerText = '-' + newDiscountSpaces + ' сом'

                //Сброс товаров в доставке
                if (card.getAttribute('data-id') === '1') {
                    const li = document.querySelector('[data-cardid="1"]');
                    deliveryList.removeChild(li);
                } else if (card.getAttribute('data-id') === '2' && parseInt(counter.value) < 11) {
                    const li = document.querySelector('[data-cardid="2"]');
                    deliveryList.removeChild(li);
                } else if (card.getAttribute('data-id') === '3') {
                    const li = document.querySelector('[data-cardid="3"]');
                    deliveryList.removeChild(li);
                }

                if (card.getAttribute('data-id') === '2' && parseInt(counter.value) >= 11) {
                    const li = document.querySelector('[data-cardid="2"]');
                    deliveryList.removeChild(li);
                    const row = document.querySelector('[data-rowid="2"]');
                    deliveryContainer.removeChild(row);
                }

                const listCollection = deliveryList.children;

                if (listCollection.length == 0) {
                    deliveryTitle.innerText = '';
                }
            }

            cartLabels.forEach((label) => {
                label.innerText = --label.innerText;

                if (parseInt(label.innerText) == 0) {
                    label.style.display = 'none';
                }
            });
        }
    });
}

export {
    removeCard
};