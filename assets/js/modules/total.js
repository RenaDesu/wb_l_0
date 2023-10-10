import {getNoun, getPriceNoSpaces, getPriceSpaces} from './utils';

const totalPriceEl = document.querySelector('.total__price');
const totalPriceNoDiscountEl = document.querySelector('#total-price');
const totalDiscount = document.querySelector('#discount');
const totalProductsEl = document.querySelector('#total-products');
const debitToggle = document.querySelector('#debit');
const orderButton = document.querySelector('#order');

const priceEl = document.querySelectorAll('.card__price-current');
const discountEl = document.querySelectorAll('.card__price-old');
const productsCounters = document.querySelectorAll('[data-counter]');

const checkBoxes = document.querySelectorAll('[data-checkbox]');
const mainCheckBox = document.querySelector('#checkbox');


function total() {
    window.addEventListener('change', function (event) {

        const isAllChecked = [...checkBoxes].every(item => item.checked);

        //Включение главного чекбокса, если все чекбоксы выбраны
        checkBoxes.forEach((checkbox) => {
            if (event.target == checkbox && isAllChecked) {
                mainCheckBox.checked = true;
            }
        });

        // Чекбокс выбран
        if (event.target.hasAttribute('data-checkbox') && event.target.checked) {

            // Карточка с выбранным чекбоксом
            const card = event.target.closest('.card');

            //Кол-во товаров в корзине
            function totalProducts() {
                const productsCounter = card.querySelector('[data-counter]');

                let productsTotalClean = getPriceNoSpaces(totalProductsEl);

                const productsCounterText = productsCounter.value;
                productsTotalClean += parseInt(productsCounterText);

                totalProductsEl.innerText = `${productsTotalClean} ${getNoun(productsTotalClean, 'товар', 'товара', 'товаров')} `;
            };

            totalProducts();

            //Расчет итоговой цены в корзине
            function totalPrice() {

                const priceElement = card.querySelector('.card__price-current');
                const descountElement = card.querySelector('.card__price-old');

                //с учетом скидки
                let priceTotalClean = getPriceNoSpaces(totalPriceEl);

                const cleanItem = getPriceNoSpaces(priceElement);
                priceTotalClean += cleanItem;

                totalPriceEl.innerText = getPriceSpaces(priceTotalClean) + ' ' + 'сом';

                if (debitToggle.checked) {
                    const newText = totalPriceEl.innerText;
                    orderButton.innerText = 'Оплатить' + ' ' + newText;
                }

                //без скидки
                let priceTotalNoDiscClean = getPriceNoSpaces(totalPriceNoDiscountEl);

                const cleanNoDiscItem = getPriceNoSpaces(descountElement);
                priceTotalNoDiscClean += cleanNoDiscItem;

                totalPriceNoDiscountEl.innerText = getPriceSpaces(priceTotalNoDiscClean) + ' ' + 'сом';

                //скидка
                let discountTotalClean = getPriceNoSpaces(totalDiscount);

                const discountSum = discountTotalClean + (cleanNoDiscItem - cleanItem);
                totalDiscount.innerText = '−' + getPriceSpaces(discountSum) + ' ' + 'сом';
            }

            totalPrice();

            // Чекбокс не выбран
        } else if (event.target.hasAttribute('data-checkbox') && !event.target.checked) {

            //Выключение главного чекбокса, если хоть один чекбокс не выбран
            mainCheckBox.checked = false;

            // Карточка с чекбоксом
            const card = event.target.closest('.card');

            //Кол-во товаров в корзине
            function totalProducts() {
                const productsCounter = card.querySelector('[data-counter]');

                let productsTotalClean = getPriceNoSpaces(totalProductsEl);

                const productsCounterText = productsCounter.value;
                productsTotalClean -= parseInt(productsCounterText);

                totalProductsEl.innerText = `${productsTotalClean} ${getNoun(productsTotalClean, 'товар', 'товара', 'товаров')} `;
            };

            totalProducts();

            //Расчет итоговой цены в корзине
            function totalPrice() {

                const priceElement = card.querySelector('.card__price-current');
                const descountElement = card.querySelector('.card__price-old');

                //с учетом скидки
                let priceTotalClean = getPriceNoSpaces(totalPriceEl);

                const cleanItem = getPriceNoSpaces(priceElement);
                priceTotalClean -= cleanItem;

                totalPriceEl.innerText = getPriceSpaces(priceTotalClean) + ' ' + 'сом';


                if (debitToggle.checked) {
                    const newText = totalPriceEl.innerText;
                    orderButton.innerText = 'Заказать' + ' ' + newText;
                }


                //без скидки
                let priceTotalNoDiscClean = getPriceNoSpaces(totalPriceNoDiscountEl);

                const cleanNoDiscItem = getPriceNoSpaces(descountElement);
                priceTotalNoDiscClean -= cleanNoDiscItem;

                totalPriceNoDiscountEl.innerText = getPriceSpaces(priceTotalNoDiscClean) + ' ' + 'сом';

                //скидка
                let discountTotalClean = getPriceNoSpaces(totalDiscount);

                const discountSum = discountTotalClean - (cleanNoDiscItem - cleanItem);
                totalDiscount.innerText = '−' + getPriceSpaces(discountSum) + ' ' + 'сом';
            }

            totalPrice();

            //Главный чекбокс выбран    
        } else if (event.target.hasAttribute('data-checkbox-main') && event.target.checked) {

            //Включение всех чекбоксов, если главный чекбокс выбран
            checkBoxes.forEach((checkBox) => {
                checkBox.checked = true;
            });

            //Кол-во товаров в корзине
            function totalProducts() {

                productsCounters.forEach((counter) => {
                    let productsTotalClean = getPriceNoSpaces(totalProductsEl);

                    const productsCounterText = counter.value;
                    productsTotalClean += parseInt(productsCounterText);

                    totalProductsEl.innerText = `${productsTotalClean} ${getNoun(productsTotalClean, 'товар', 'товара', 'товаров')} `;
                });
            };

            totalProducts();

            //Расчет итоговой цены в корзине
            function totalPrice() {

                //с учетом скидки 
                priceEl.forEach((price) => {
                    let priceTotalClean = getPriceNoSpaces(totalPriceEl);

                    const cleanItem = getPriceNoSpaces(price);
                    priceTotalClean += cleanItem;

                    totalPriceEl.innerText = getPriceSpaces(priceTotalClean) + ' ' + 'сом';

                    if (debitToggle.checked) {
                        const newText = totalPriceEl.innerText;
                        orderButton.innerText = 'Заказать' + ' ' + newText;
                    }
                });

                //без скидки
                discountEl.forEach((discount) => {
                    let priceTotalNoDiscClean = getPriceNoSpaces(totalPriceNoDiscountEl);

                    const cleanNoDiscItem = getPriceNoSpaces(discount);
                    priceTotalNoDiscClean += cleanNoDiscItem;

                    totalPriceNoDiscountEl.innerText = getPriceSpaces(priceTotalNoDiscClean) + ' ' + 'сом';
                });

                //скидка
                let discountTotalClean = getPriceNoSpaces(totalDiscount);
                let priceTotalNoDiscClean = getPriceNoSpaces(totalPriceNoDiscountEl);
                let priceTotalClean = getPriceNoSpaces(totalPriceEl);

                const discountSum = discountTotalClean + (priceTotalNoDiscClean - priceTotalClean);
                totalDiscount.innerText = '−' + getPriceSpaces(discountSum) + ' ' + 'сом';
            }

            totalPrice();

            //Главный чекбокс не выбран     
        } else if (event.target.hasAttribute('data-checkbox-main') && !event.target.checked) {

            //Выключение всех чекбоксов, если главный чекбокс не выбран
            checkBoxes.forEach((checkBox) => {
                checkBox.checked = false;
            });

            //Кол-во товаров в корзине
            function totalProducts() {
                totalProductsEl.innerText = '0 товаров';

            };

            totalProducts();

            //Расчет итоговой цены в корзине
            function totalPrice() {

                //с учетом скидки 
                totalPriceEl.innerText = '0 сом';

                if (debitToggle.checked) {
                    const newText = totalPriceEl.innerText;
                    orderButton.innerText = 'Заказать' + ' ' + newText;
                }

                //без скидки
                totalPriceNoDiscountEl.innerText = '0 сом';

                //скидка
                totalDiscount.innerText = '−0 сом';
            }

            totalPrice();
        }
    });

    function debitFunds() {
        debitToggle.addEventListener('change', function (event) {
            if (event.target.checked) {
                const newText = totalPriceEl.innerText;
                orderButton.innerText = 'Оплатить' + ' ' + newText;
            } else {
                orderButton.innerText = 'Заказать';
            }
        });
    }

    debitFunds();
}

export {
    total
};