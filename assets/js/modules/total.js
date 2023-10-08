import {getNoun} from './utils';

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

                let productsTotal = totalProductsEl.innerText;
                let productsTotalTotalNoSpaces = productsTotal.replace(/[^0-9]/g, '');
                let productsTotalClean = parseInt(productsTotalTotalNoSpaces);

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
                let priceTotal = totalPriceEl.innerText;
                let priceTotalNoSpaces = priceTotal.replace(/[^0-9]/g, '');
                let priceTotalClean = parseInt(priceTotalNoSpaces);

                const itemText = priceElement.innerText;
                const cleanItem = itemText.replace(/[^0-9]/g, '');
                priceTotalClean += parseInt(cleanItem);

                const priceTotalSpaces = priceTotalClean.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                const priceTotalFull = priceTotalSpaces + ' ' + 'сом';
                totalPriceEl.innerText = priceTotalFull;

                if (debitToggle.checked) {
                    const newText = totalPriceEl.innerText;
                    orderButton.innerText = 'Оплатить' + ' ' + newText;
                }

                //без скидки
                let priceTotalNoDisc = totalPriceNoDiscountEl.innerText;
                let priceTotalNoDiscNoSpaces = priceTotalNoDisc.replace(/[^0-9]/g, '');
                let priceTotalNoDiscClean = parseInt(priceTotalNoDiscNoSpaces);

                const itemNoDiscText = descountElement.innerText;
                const cleanNoDiscItem = itemNoDiscText.replace(/[^0-9]/g, '');
                priceTotalNoDiscClean += parseInt(cleanNoDiscItem);

                const priceTotalNoDiscSpaces = priceTotalNoDiscClean.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                const priceTotaNoDisclFull = priceTotalNoDiscSpaces + ' ' + 'сом';
                totalPriceNoDiscountEl.innerText = priceTotaNoDisclFull;

                //скидка
                let discountTotal = totalDiscount.innerText;
                let discountTotalNoSpaces = discountTotal.replace(/[^0-9]/g, '');
                let discountTotalClean = parseInt(discountTotalNoSpaces);

                const discountSum = discountTotalClean + (parseInt(cleanNoDiscItem) - parseInt(cleanItem));
                const discountSumSpaces = discountSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                const discountSumFinal = '−' + discountSumSpaces + ' ' + 'сом'
                totalDiscount.innerText = discountSumFinal;
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

                let productsTotal = totalProductsEl.innerText;
                let productsTotalTotalNoSpaces = productsTotal.replace(/[^0-9]/g, '');
                let productsTotalClean = parseInt(productsTotalTotalNoSpaces);

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
                let priceTotal = totalPriceEl.innerText;
                let priceTotalNoSpaces = priceTotal.replace(/[^0-9]/g, '');
                let priceTotalClean = parseInt(priceTotalNoSpaces);

                const itemText = priceElement.innerText;
                const cleanItem = itemText.replace(/[^0-9]/g, '');
                priceTotalClean -= parseInt(cleanItem);

                const priceTotalSpaces = priceTotalClean.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                const priceTotalFull = priceTotalSpaces + ' ' + 'сом';
                totalPriceEl.innerText = priceTotalFull;


                if (debitToggle.checked) {
                    const newText = totalPriceEl.innerText;
                    orderButton.innerText = 'Заказать' + ' ' + newText;
                }


                //без скидки
                let priceTotalNoDisc = totalPriceNoDiscountEl.innerText;
                let priceTotalNoDiscNoSpaces = priceTotalNoDisc.replace(/[^0-9]/g, '');
                let priceTotalNoDiscClean = parseInt(priceTotalNoDiscNoSpaces);

                const itemNoDiscText = descountElement.innerText;
                const cleanNoDiscItem = itemNoDiscText.replace(/[^0-9]/g, '');
                priceTotalNoDiscClean -= parseInt(cleanNoDiscItem);

                const priceTotalNoDiscSpaces = priceTotalNoDiscClean.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                const priceTotaNoDisclFull = priceTotalNoDiscSpaces + ' ' + 'сом';
                totalPriceNoDiscountEl.innerText = priceTotaNoDisclFull;

                //скидка
                let discountTotal = totalDiscount.innerText;
                let discountTotalNoSpaces = discountTotal.replace(/[^0-9]/g, '');
                let discountTotalClean = parseInt(discountTotalNoSpaces);

                const discountSum = discountTotalClean - (parseInt(cleanNoDiscItem) - parseInt(cleanItem));
                const discountSumSpaces = discountSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                const discountSumFinal = '−' + discountSumSpaces + ' ' + 'сом'
                totalDiscount.innerText = discountSumFinal;
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
                    let productsTotal = totalProductsEl.innerText;
                    let productsTotalTotalNoSpaces = productsTotal.replace(/[^0-9]/g, '');
                    let productsTotalClean = parseInt(productsTotalTotalNoSpaces);

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
                    let priceTotal = totalPriceEl.innerText;
                    let priceTotalNoSpaces = priceTotal.replace(/[^0-9]/g, '');
                    let priceTotalClean = parseInt(priceTotalNoSpaces);

                    const itemText = price.innerText;
                    const cleanItem = itemText.replace(/[^0-9]/g, '');
                    priceTotalClean += parseInt(cleanItem);

                    const priceTotalSpaces = priceTotalClean.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                    const priceTotalFull = priceTotalSpaces + ' ' + 'сом';
                    totalPriceEl.innerText = priceTotalFull;

                    if (debitToggle.checked) {
                        const newText = totalPriceEl.innerText;
                        orderButton.innerText = 'Заказать' + ' ' + newText;
                    }
                });

                //без скидки
                discountEl.forEach((discount) => {
                    let priceTotalNoDisc = totalPriceNoDiscountEl.innerText;
                    let priceTotalNoDiscNoSpaces = priceTotalNoDisc.replace(/[^0-9]/g, '');
                    let priceTotalNoDiscClean = parseInt(priceTotalNoDiscNoSpaces);

                    const itemNoDiscText = discount.innerText;
                    const cleanNoDiscItem = itemNoDiscText.replace(/[^0-9]/g, '');
                    priceTotalNoDiscClean += parseInt(cleanNoDiscItem);

                    const priceTotalNoDiscSpaces = priceTotalNoDiscClean.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                    const priceTotaNoDisclFull = priceTotalNoDiscSpaces + ' ' + 'сом';
                    totalPriceNoDiscountEl.innerText = priceTotaNoDisclFull;
                });

                //скидка
                let discountTotal = totalDiscount.innerText;
                let discountTotalNoSpaces = discountTotal.replace(/[^0-9]/g, '');
                let discountTotalClean = parseInt(discountTotalNoSpaces);

                let priceTotalNoDisc = totalPriceNoDiscountEl.innerText;
                let priceTotalNoDiscNoSpaces = priceTotalNoDisc.replace(/[^0-9]/g, '');
                let priceTotalNoDiscClean = parseInt(priceTotalNoDiscNoSpaces);

                let priceTotal = totalPriceEl.innerText;
                let priceTotalNoSpaces = priceTotal.replace(/[^0-9]/g, '');
                let priceTotalClean = parseInt(priceTotalNoSpaces);


                const discountSum = discountTotalClean + (priceTotalNoDiscClean - priceTotalClean);
                const discountSumSpaces = discountSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                const discountSumFinal = '−' + discountSumSpaces + ' ' + 'сом'
                totalDiscount.innerText = discountSumFinal;
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