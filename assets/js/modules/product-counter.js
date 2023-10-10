import {
    getNoun, getPriceSpaces, getPriceNoSpaces
} from './utils';
import {
    DATES
} from './delivery';
import {
    setSmallText
} from './small-text'

const totalProducts = document.querySelector('[data-total-products]');
const totalSum = document.querySelector('[data-total-sum]');
const totalPriceEl = document.querySelector('.total__price');
const totalPriceNoDiscountEl = document.querySelector('#total-price');
const totalProductsEl = document.querySelector('#total-products');
const totalDiscount = document.querySelector('#discount');
const debitToggle = document.querySelector('#debit');
const orderButton = document.querySelector('#order');

const deliveryContainer = document.querySelector('[data-delivery-container]');

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

                if (parseInt(counter.value) == 2) {
                    event.target.disabled = true;
                }

            } else if (card.getAttribute('data-id') === '2') {
                counter.value = ++counter.value;
            } else if (card.getAttribute('data-id') === '3') {
                counter.value = ++counter.value;
            }

            //Цена товаров со скидкой и без
            const priceSet = price.dataset.current;
            const oldPriceSet = priceOld.dataset.old;

            //Расчет нового значения цены в карточке товара
            priceTotal = (priceSet * parseInt(counter.value));
            priceOldTotal = (oldPriceSet * parseInt(counter.value));

            const newPrice = getPriceSpaces(priceTotal) + ' ' + 'сом';
            const newOldPrice = getPriceSpaces(priceOldTotal) + ' ' + 'сом';

            //Новое значение цены в карточке товара
            price.innerText = newPrice;
            priceOld.innerText = newOldPrice;

            //Расчет нового значения цены товаров в корзине (где заголовок спойлера)

            const totalSumNew = getPriceNoSpaces(totalSum) + parseInt(priceSet);

            //Новое значение цены товаров в корзине (где заголовок спойлера)
            totalSum.innerText = getPriceSpaces(totalSumNew) + ' ' + 'сом';

            //Расчет нового значения кол-ва товаров в корзине (где заголовок спойлера)
            const totalProductsNew = getPriceNoSpaces(totalProducts) + 1;

            //Новое значение кол-ва товаров в корзине (где заголовок спойлера)
            totalProducts.innerText = `${totalProductsNew} ${getNoun(totalProductsNew, 'товар', 'товара', 'товаров')} `;

            setSmallText(price);

            if (checkbox.checked) {
                // Расчет итоговой цены выбранных товаров со скидкой и без
                const totalPriceElNew = getPriceNoSpaces(totalPriceEl) + parseInt(priceSet);
                const totalPriceNoDiscountElNew = getPriceNoSpaces(totalPriceNoDiscountEl) + parseInt(oldPriceSet);

                // Новое значение итоговой цены выбранных товаров со скидкой и без
                totalPriceEl.innerText = getPriceSpaces(totalPriceElNew) + ' ' + 'сом';
                totalPriceNoDiscountEl.innerText = getPriceSpaces(totalPriceNoDiscountElNew) + ' ' + 'сом';

                //Отображение цены в кнопке
                if (debitToggle.checked) {
                    const newText = totalPriceEl.innerText;
                    orderButton.innerText = 'Оплатить' + ' ' + newText;
                }

                //Расчет суммы скидки выбранных товаров 
                const discountSum = getPriceNoSpaces(totalDiscount) + (parseInt(oldPriceSet) - parseInt(priceSet));
                const discountSumFinal = '−' + getPriceSpaces(discountSum) + ' ' + 'сом'

                // Новое значение суммы скидки выбранных товаров 
                totalDiscount.innerText = discountSumFinal;

                //Расчет нового значения кол-ва выбранных товаров
                const totalProductsNew = getPriceNoSpaces(totalProductsEl) + 1;

                //Новое значение кол-ва выбранных товаров
                totalProductsEl.innerText = `${totalProductsNew} ${getNoun(totalProductsNew, 'товар', 'товара', 'товаров')} `;

                //Кол-во товаров в доставке
                if (card.getAttribute('data-id') === '1') {
                    const label = document.querySelector('[data-label="1"]');
                    if (parseInt(counter.value) == 1) {
                        label.style.display = 'none';
                    } else {
                        label.style.display = 'block';
                    }
                    label.innerText = counter.value;
                } else if (card.getAttribute('data-id') === '2') {
                    const label = document.querySelector('[data-label="2"]');
                    if (parseInt(counter.value) == 1) {
                        label.style.display = 'none';
                    } else {
                        label.style.display = 'block';
                    }
                    label.innerText = counter.value;

                    if (parseInt(counter.value) == 185) {
                        label.innerText = 184;
                        const productInfo = {
                            id: card.dataset.id,
                            imgSrc: card.querySelector('.checkbox__label-pic').getAttribute('src'),
                            imgSrcSet: card.querySelector('.checkbox__label-pic').getAttribute('srcset'),
                            value: counter.value - 184 + 1,
                        };


                        const deliveryRow = createDeliveryRow(productInfo);
                        const deliveryNewList = createDeliveryList();

                        const deliveryItemOtherDate = createDeliveryItemOtherDate(productInfo);
                        deliveryNewList.appendChild(deliveryItemOtherDate);
                        deliveryRow.appendChild(deliveryNewList);
                        deliveryContainer.appendChild(deliveryRow);
                    }

                    if (parseInt(counter.value) > 184) {
                        label.innerText = 184;
                        const liOtherDate = document.querySelector('[data-date="other"]')
                        const labelOtherDate = liOtherDate.querySelector('.button__label');
                        labelOtherDate.innerText = counter.value - 184;
                    }

                } else if (card.getAttribute('data-id') === '3') {
                    const label = document.querySelector('[data-label="3"]');
                    if (parseInt(counter.value) == 1) {
                        label.style.display = 'none';
                    } else {
                        label.style.display = 'block';
                    }
                    label.innerText = counter.value;
                }
            }
        }

        if (event.target.dataset.action === 'minus') {

            if (parseInt(counter.value) > 1) {
                if (card.getAttribute('data-id') === '1') {
                    plus.disabled = false;
                }

                counter.value = --counter.value;

                //Цена товаров со скидкой и без
                const priceSet = price.dataset.current;
                const oldPriceSet = priceOld.dataset.old;

                //Расчет нового значения цены в карточке товара
                priceTotal = (getPriceNoSpaces(price) - priceSet);
                priceOldTotal = (getPriceNoSpaces(priceOld) - oldPriceSet);

                const newPrice = getPriceSpaces(priceTotal) + ' ' + 'сом';
                const newOldPrice = getPriceSpaces(priceOldTotal) + ' ' + 'сом';

                //Новое значение цены в карточке товара
                price.innerText = newPrice;
                priceOld.innerText = newOldPrice;

                //Расчет нового значения цены товаров в корзине (где заголовок спойлера)
                const totalSumNew = getPriceNoSpaces(totalSum) - parseInt(priceSet);

                //Новое значение цены товаров в корзине (где заголовок спойлера)
                totalSum.innerText = getPriceSpaces(totalSumNew) + ' ' + 'сом';

                //Расчет нового значения кол-ва товаров в корзине (где заголовок спойлера)
                const totalProductsNew = getPriceNoSpaces(totalProducts) - 1;

                //Новое значение кол-ва товаров в корзине (где заголовок спойлера)
                totalProducts.innerText = `${totalProductsNew} ${getNoun(totalProductsNew, 'товар', 'товара', 'товаров')}`;

                setSmallText(price);

                if (checkbox.checked) {
                    // Расчет итоговой цены выбранных товаров со скидкой и без
                    const totalPriceElNew = getPriceNoSpaces(totalPriceEl) - parseInt(priceSet);
                    const totalPriceNoDiscountElNew = getPriceNoSpaces(totalPriceNoDiscountEl) - parseInt(oldPriceSet);

                    // Новое значение итоговой цены выбранных товаров со скидкой и без
                    totalPriceEl.innerText = getPriceSpaces(totalPriceElNew) + ' ' + 'сом';
                    totalPriceNoDiscountEl.innerText = getPriceSpaces(totalPriceNoDiscountElNew) + ' ' + 'сом';

                    //Отображение цены в кнопке
                    if (debitToggle.checked) {
                        const newText = totalPriceEl.innerText;
                        orderButton.innerText = 'Оплатить' + ' ' + newText;
                    }

                    //Расчет суммы скидки выбранных товаров 
                    const discountSum = getPriceNoSpaces(totalDiscount) - (parseInt(oldPriceSet) - parseInt(priceSet));
                    const discountSumFinal = '−' + getPriceSpaces(discountSum) + ' ' + 'сом'

                    // Новое значение суммы скидки выбранных товаров 
                    totalDiscount.innerText = discountSumFinal;

                    //Расчет нового значения кол-ва выбранных товаров
                    const totalProductsNew = getPriceNoSpaces(totalProductsEl) - 1;

                    //Новое значение кол-ва выбранных товаров
                    totalProductsEl.innerText = `${totalProductsNew} ${getNoun(totalProductsNew, 'товар', 'товара', 'товаров')} `;

                    //Кол-во товаров в доставке
                    if (card.getAttribute('data-id') === '1') {
                        const label = document.querySelector('[data-label="1"]');
                        if (parseInt(counter.value) == 1) {
                            label.style.display = 'none';
                        } else {
                            label.style.display = 'block';
                        }
                        label.innerText = counter.value;
                    } else if (card.getAttribute('data-id') === '2') {
                        const label = document.querySelector('[data-label="2"]');
                        if (parseInt(counter.value) == 1) {
                            label.style.display = 'none';
                        } else {
                            label.style.display = 'block';
                        }
                        label.innerText = counter.value;

                        if (parseInt(counter.value) >= 184) {
                            label.innerText = 184;
                            const liOtherDate = document.querySelector('[data-date="other"]')
                            const labelOtherDate = liOtherDate.querySelector('.button__label');
                            labelOtherDate.innerText = counter.value - 184;
                        }

                        const row = document.querySelector('[data-rowid="2"]');
                        if (parseInt(counter.value) == 184) {
                            row.remove();
                        }

                    } else if (card.getAttribute('data-id') === '3') {
                        const label = document.querySelector('[data-label="3"]');
                        if (parseInt(counter.value) == 1) {
                            label.style.display = 'none';
                        } else {
                            label.style.display = 'block';
                        }
                        label.innerText = counter.value;
                    }
                }
            }

        }
    });

    // Функция для создания элементов
    const makeElement = function (tagName, className, text) {
        const element = document.createElement(tagName);
        element.classList.add(className);
        if (text) {
            element.textContent = text;
        }
        return element;
    };

    const createDeliveryItemOtherDate = function (product) {
        const deliveryItem = makeElement('li', 'delivery__item');
        deliveryItem.classList.add('mini-card');
        deliveryItem.setAttribute("data-cardid", `${product.id}`);
        deliveryItem.setAttribute("data-date", "other");

        deliveryItem.innerHTML = `<button class="mini-card__button button button--card" type="button">
                <img class="mini-card__img" src="${product.imgSrc}"
                    srcset="${product.imgSrcSet}">
                <span class="button__label button__label--card-mini">${product.value}</span>
            </button>`;

        return deliveryItem;
    };

    // Функция для создания блок с датами
    const createDeliveryRow = function (product) {
        const deliveryRow = makeElement('div', 'delivery__row');
        deliveryRow.setAttribute("data-rowid", `${product.id}`);
        const title = makeElement('h3', 'delivery__title', DATES.date2);

        deliveryRow.appendChild(title);

        return deliveryRow;
    };

    // Функция для создания списка доставки
    const createDeliveryList = function () {
        const deliveryList = makeElement('ul', 'delivery__list');
        return deliveryList;
    };
}

export {
    productCounter
};